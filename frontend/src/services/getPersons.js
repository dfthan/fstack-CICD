import axios from 'axios'

const getAll = () => {
    return axios.get("/api/persons")
}

const createPerson = (object) => {
    return axios.post("/api/persons", object)
}

const deletePerson = (id) => {
    return axios.delete(`/api/persons/${id}`)

}

const update = (id, object) => {
    const request = axios.put(`/api/persons/${id}`, object)
    return request.then(response => response.data)
}


export default { getAll, createPerson, deletePerson, update }