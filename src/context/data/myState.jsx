import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

function MyState(props) {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [events, setEvents] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    clubname: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // ********************** Add Events Section  **********************
  const addEvent = async () => {
    if (
      events.title == null ||
      events.price == null ||
      events.imageUrl == null ||
      events.category == null ||
      events.clubname == null ||
      events.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    const eventRef = collection(fireDB, "events");
    setLoading(true);
    try {
      await addDoc(eventRef, events);
      toast.success("Event Added Successfully");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
      getEventData();
      closeModal();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setEvents("");
  };

  const [event, setEvent] = useState([]);

  // ****** get event
  const getEventData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "events"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let eventsArray = [];
        QuerySnapshot.forEach((doc) => {
          eventsArray.push({ ...doc.data(), id: doc.id });
        });
        setEvent(eventsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  // const edithandle = (item) => {
  //   setEvents(item);
  // };

  // Update event function

  const updateEvent = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "events", events.id), events);
      toast.success("Event Updated successfully");
      getEventData();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setEvents("");
  };

  // Delete event function

  const deleteEvent = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "events", item.id), events);
      toast.success("Event Deleted successfully");
      getEventData();
      setLoading(false);
    } catch (error) {
      toast.success("Event Deleted Falied");
      setLoading(false);
      console.log(error);
    }
  };

  // Showing registered events in history

  const [history, setHistory] = useState([]);

  const getHistoryData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const historyArray = [];
      result.forEach((doc) => {
        historyArray.push(doc.data());
        setLoading(false);
      });
      setHistory(historyArray);
      console.log(historyArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filtering Events

  const [searchkey, setSearchkey] = useState("");
  const [filterClub, setFilterClub] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    getEventData();
    getHistoryData();
    getUserData();
  }, []);


  // Clubs Section
  const [clubs, setClubs] = useState({
    title: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Adding Clubs to firebase
  const addClub = async () => {
    if (
      events.title == null ||
      events.imageUrl == null ||
      events.category == null ||
      events.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    const clubRef = collection(fireDB, "clubs");
    setLoading(true);
    try {
      await addDoc(clubRef, clubs);
      toast.success("Event Added Successfully");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
      getEventData();
      closeModal();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setClubs("");
  };

  const [club, setClub] = useState([]);

  // ****** get club 

  const getClubData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "clubs"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let clubsArray = [];
        QuerySnapshot.forEach((doc) => {
          eventsArray.push({ ...doc.data(), id: doc.id });
        });
        setClub(clubsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getClubData();
  }, []);

  const edithandle = (item) => {
    setEvents(item);
    setClub(item);
  };

  // Update event function

  const updateClub = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "clubs", clubs.id), clubs);
      toast.success("Club Updated successfully");
      getClubData();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setClubs("");
  };

  // Delete event function

  const deleteClub = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "clubs", item.id), clubs);
      toast.success("Club Deleted successfully");
      getClubData();
      setLoading(false);
    } catch (error) {
      toast.success("Club Deleted Falied");
      setLoading(false);
      console.log(error);
    }
  };

  const [searchkeyclub, setSearchkeyClub] = useState("");
  const [filterCategoryClub, setFilterCategoryClub] = useState("");



  useEffect(() => {
    getEventData();
    getHistoryData();
    getUserData();
  }, []);


  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        events,
        setEvents,
        event,
        addEvent,
        edithandle,
        updateEvent,
        deleteEvent,
        history,
        user,
        searchkey,
        setSearchkey,
        filterClub,
        setFilterClub,
        filterCategory,
        setFilterCategory,
        clubs,
        setClubs,
        addClub,
        club,
        updateClub,
        deleteClub,

      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
