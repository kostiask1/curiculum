import React, { useState, useContext, useEffect } from "react"
import { app } from "../../base"
import { cvContext } from "../../context/catalog/cv-context"
import "../../sass/creator.scss"
const db = app.firestore()

const Creator = (props) => {
    const { findWithTitle, data } = useContext(cvContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [imagesArray, setImagesArray] = useState([""])
    const [stack, setStack] = useState("")
    const [id, setId] = useState(new Date().getTime())
    const [order, setOrder] = useState(0)

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
        findWithTitle(props.params.post)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (data.hasOwnProperty("title")) {
            console.log(data)
            setTitle(data.title ?? "")
            setImage(data.imagePreview ?? "")
            setImagesArray(data.imagesArray ?? [""])
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
        }
        console.log(data)
        db.collection("All")
            .doc(data.id)
            .set(data)
            .then(() => clearInputs())
    }

    const handleTitle = (e) => {
        if (!e) return setTitle("")
        let newTitle = e[0].toUpperCase()
        newTitle = newTitle + e.slice(1)
        setTitle(newTitle)
    }

    const loadImages = async (e, type) => {
        console.log(e)
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
    const handleImageSet = (e, value, index) => {
        e.preventDefault()
        if (value === "delete") {
            setImagesArray((prevArray) =>
                prevArray.splice(prevArray.splice(index, 1))
            )
        } else if (value === "add") {
            setImagesArray((prevArray) => [...prevArray, ""])
        } else {
            setImagesArray((prevArray) =>
                prevArray.splice(prevArray.splice(index, 1, value))
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
        console.log(stack)
    }
    return (
        <div className="creator">
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
                                    <div>
                                        <label>Preview Image</label>
                                        <input
                                            type="text"
                                            name="image"
                                            value={image}
                                            placeholder="Preview Image"
                                            onChange={(e) =>
                                                setImage(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
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
                                    </div>
                                    <div>
                                        <label>Full Image</label>
                                        {imagesArray.map((img, index) => (
                                            <div
                                                key={index}
                                                className="fullimage"
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
                                                            index
                                                        )
                                                    }
                                                    value={img}
                                                />
                                                <button
                                                    onClick={(e) =>
                                                        handleImageSet(
                                                            e,
                                                            "delete",
                                                            index
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
                                            + изображение
                                        </button>
                                    </div>
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
                            <button type="submit" onClick={(e) => newItem(e)}>
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="block">
                        <h1>{title}</h1>
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

export default Creator
