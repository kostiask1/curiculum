import React, { useReducer } from "react"
import { cvReducer } from "./cv-reducer"
import { cvContext } from "./cv-context"
import { app } from "../../base"
const db = app.firestore()
const RESPONSE = "RESPONSE"

export const CvState = ({ children }) => {
    const initialState = {
        data: [],
    }

    const [state, dispatch] = useReducer(cvReducer, initialState)

    const findWithTitle = async (title) => {
        if (!title) return dispatch({ type: RESPONSE, payload: [] })
        let payload = []
        try {
            const promise = Promise.resolve(
                db.collection("All").where("title", "==", title).get()
            )
            promise.then((item) => {
                payload = item.docs[0].data()
                dispatch({ type: RESPONSE, payload })
            })
        } catch (err) {
            console.error(err)
        }
    }

    const find = async () => {
        try {
            let row = []
            db.collection("All")
                .orderBy("order", "asc")
                .get()
                .then((resp) => {
                    let promise = new Promise((resolve) => {
                        if (resp.docs.length) {
                            resp.forEach((doc) => {
                                return row.push(doc.data())
                            })
                            resolve(row)
                        } else {
                            resolve([])
                        }
                    })
                    promise.then((payload) => {
                        return dispatch({ type: RESPONSE, payload })
                    })
                })
        } catch (err) {
            console.error(err)
        }
    }

    const { data } = state

    return (
        <cvContext.Provider
            value={{
                find,
                data,
                findWithTitle,
            }}
        >
            {children}
        </cvContext.Provider>
    )
}
