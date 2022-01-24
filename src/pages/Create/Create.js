import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { app } from "../../base"
import { cvContext } from "../../context/catalog/cv-context"
import "../../sass/create.scss"
const db = app.firestore()

const Create = (props) => {
    const { getPostById, data } = useContext(cvContext)
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [imagesArray, setImagesArray] = useState([""])
    const [stack, setStack] = useState("")
    const [id, setId] = useState(new Date().getTime())
    const [order, setOrder] = useState(0)
    const history = useHistory()

    const technologies = [
        "Responsive markup",
        "SCSS",
        "Flexbox",
        "Grid layout",
        "JS",
        "React",
        "jQuery",
        "REST API",
        "Bootstrap",
        "Firebase",
    ]

    useEffect(() => {
        getPostById(props.params.post)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (data.hasOwnProperty("title")) {
            setTitle(data.title ?? "")
            setImage(data.imagePreview ?? "")
            setImagesArray(data.imagesArray ?? [""])
            setLink(data.link ?? "")
            setDescription(data.description ?? "")
            setStack(data.stack ?? [])
            setId(data.id ?? new Date().getTime())
            setOrder(data.order ?? 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const clearInputs = (e) => {
        if (e) e.preventDefault()
        setTitle("")
        setImage("")
        setImagesArray([""])
        setDescription("")
        setStack("")
        setLink("")
        setOrder(0)
    }

    const newItem = (e) => {
        e.preventDefault()
        const data = {
            title,
            description,
            imagesArray,
            imagePreview: image,
            stack,
            id,
            order,
            link,
        }
        if (
            !data.title ||
            !data.imagePreview ||
            (data.imagesArray.length === 1 && data.imagesArray[0] === "")
        )
            return
        db.collection("All")
            .doc(`${data.id}`)
            .set(data)
            .then(() => {
                if (data.id) {
                    history.push("/post/" + data.id)
                }
                clearInputs()
            })
    }

    const handleTitle = (e) => {
        if (!e) return setTitle("")
        let newTitle = e[0].toUpperCase()
        newTitle = newTitle + e.slice(1)
        setTitle(newTitle)
    }

    const loadImages = async (e, type) => {
        try {
            let files = Array.from(e)
            let links = []
            const storageRef = app.storage().ref().child("posts")
            let requests = Promise.all(
                files.map(async (file) => {
                    const fileRef = storageRef.child(file.name)
                    await fileRef.put(file)
                    links.push(await fileRef.getDownloadURL())
                })
            )
            requests.then(() => {
                if (type === "preview") {
                    setImage(links[0])
                } else if (type === "full") {
                    setImagesArray((array) => {
                        if (array[0] === "") {
                            array.shift()
                        }
                        return array.concat(links)
                    })
                }
            })
        } catch (err) {
            console.error(err)
        }
    }
    const handleImageSet = (e, value, img) => {
        e.preventDefault()
        if (value === "delete") {
            setImagesArray((prevArray) =>
                prevArray.splice(prevArray.splice(prevArray.indexOf(img), 1))
            )
            const storageRef = app.storage()
            return storageRef.refFromURL(img).delete(img)
        } else if (value === "add") {
            return setImagesArray((prevArray) => [...prevArray, ""])
        } else {
            setImagesArray((prevArray) =>
                prevArray.splice(
                    prevArray.splice(prevArray.indexOf(img), 1, value)
                )
            )
        }
    }
    const handleStack = (e, tech) => {
        e.preventDefault()
        let stackClone = [...stack]
        if (stackClone.includes(tech)) {
            stackClone.splice(stackClone.indexOf(tech), 1)
            setStack(stackClone)
        } else {
            stackClone.push(tech)
            setStack(stackClone)
        }
    }
    return (
        <div className="create">
            <div className="wrap">
                <div className="row">
                    <div className="block">
                        <form onSubmit={(e) => newItem(e)}>
                            <h2 className="title">Create item</h2>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <label>Item title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={title}
                                            placeholder="Item title"
                                            onChange={(e) =>
                                                handleTitle(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Item link</label>
                                        <input
                                            type="text"
                                            name="link"
                                            value={link}
                                            placeholder="Item link"
                                            onChange={(e) =>
                                                setLink(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label>Item description</label>
                                        <textarea
                                            type="text"
                                            cols={16}
                                            rows={6}
                                            name="description"
                                            value={description}
                                            placeholder="Item description"
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label>Preview Image</label>
                                        <div className="oneliner">
                                            <input
                                                type="text"
                                                name="image"
                                                value={image}
                                                placeholder="Preview Image"
                                                onChange={(e) =>
                                                    setImage(e.target.value)
                                                }
                                            />
                                            <label
                                                className="btn-outline"
                                                htmlFor="file"
                                            >
                                                Load preview image
                                            </label>
                                            <input
                                                style={{ display: "none" }}
                                                type="file"
                                                id="file"
                                                name="file"
                                                onChange={(e) =>
                                                    loadImages(
                                                        e.target.files,
                                                        "preview"
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <hr />
                                        <label
                                            className="btn-outline"
                                            htmlFor="files"
                                        >
                                            Load full images
                                        </label>
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            id="files"
                                            name="files"
                                            multiple
                                            onChange={(e) =>
                                                loadImages(
                                                    e.target.files,
                                                    "full"
                                                )
                                            }
                                        />
                                        {imagesArray.map((img, index) => (
                                            <div
                                                key={index}
                                                className="oneliner"
                                            >
                                                <input
                                                    key={index}
                                                    type="text"
                                                    name="image"
                                                    className="img"
                                                    placeholder="Full Image"
                                                    onChange={(e) =>
                                                        handleImageSet(
                                                            e,
                                                            e.target.value,
                                                            img
                                                        )
                                                    }
                                                    value={img}
                                                />
                                                <button
                                                    onClick={(e) =>
                                                        handleImageSet(
                                                            e,
                                                            "delete",
                                                            img
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            className="btn btn-outline"
                                            onClick={(e) =>
                                                handleImageSet(e, "add")
                                            }
                                        >
                                            + image
                                        </button>
                                    </div>
                                    <hr />
                                    <div>
                                        <label>Item Order</label>
                                        <input
                                            type="number"
                                            name="order"
                                            defaultValue={order}
                                            placeholder="Item order"
                                            onChange={(e) =>
                                                setOrder(e.target.value)
                                            }
                                        />
                                    </div>

                                    <span
                                        style={{
                                            fontSize: "1.4em",
                                            color: "var(--sub)",
                                        }}
                                    >
                                        Project tech stack
                                    </span>
                                    <hr
                                        style={{
                                            marginBottom: 0,
                                            borderColor: "var(--sub)",
                                        }}
                                    />
                                    <div className="technologies" key={stack}>
                                        {technologies.map((tech, index) => (
                                            <div key={index}>
                                                <label htmlFor={tech}>
                                                    {tech}
                                                </label>
                                                <input
                                                    id={tech}
                                                    name={tech}
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                        handleStack(e, tech)
                                                    }
                                                    value={tech}
                                                    checked={
                                                        stack?.includes(tech)
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button onClick={(e) => clearInputs(e)}>
                                reset
                            </button>
                            <button
                                className="submit"
                                type="submit"
                                onClick={(e) => newItem(e)}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="post block fadeIn">
                        <span className="name">{title}</span>
                        <p className="description">{description}</p>
                        <picture className="img-wrap">
                            <img src={image} alt={image} />
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create
