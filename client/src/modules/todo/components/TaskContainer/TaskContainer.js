import React, { useState, useCallback, useEffect } from "react";
import axios from "axios"
import HeaderComp from "../HeaderComp/HeaderComp"
import ListComp from "../ListComp/ListComp"
import './TaskContainer.css';


const TaskContainer = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);

    /* Mongodb-ből adatlekérés: minden task */
    const getData = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/todos");
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getData()
    }, [getData])

    /* Mongodb-ből adatmentése: létrehozott task */
    const createData = useCallback(async (task) => {
        try {

            await axios.post("http://localhost:8080/api/todos/", task);
            setOpen(false);
            getData()
            console.log("Sikeres", " regisztráció.");
        } catch (error) {
            setOpen(false);
            console.log("Sikertelen", " regisztráció.");
            console.log(error);
        }
    }, [setOpen, getData]);

    /* Mongodb-ből adatmodosítás: task módosítása , aztán adatlekérés */
    const updateData = useCallback(async (task) => {
        try {

            await axios.patch(`http://localhost:8080/api/todos/${task._id}`, task);
            setOpen(false);
            getData()
            console.log("Sikeres", " frissítés.");
        } catch (error) {
            setOpen(false);
            console.log("Sikertelen", " frissítés.");
            console.log(error);
        }
    }, [setOpen, getData]);

    /* Mongodb-ből adattörlés: kiválasztott task törlése "id-alapján", aztan adatlekérés */
    const deleteData = useCallback(async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`);
            setOpen(false);
            getData()
            console.log("Sikeres", " törlés.");
        } catch (error) {
            setOpen(false);
            console.log("Sikertelen", " törlés.");
            console.log(error);
        }
    }, [setOpen, getData]);

    return (
        <div className="task-container">
            <HeaderComp setOpen={setOpen} open={open} createData={createData} count={data.length - checked.length} />
            <ListComp updateData={updateData} deleteData={deleteData} data={data} checked={checked} setChecked={setChecked} />
        </div>
    )
}
export default TaskContainer;
