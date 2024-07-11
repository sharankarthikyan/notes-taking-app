import { useState, useEffect } from "react";
import HomeMenuComponent from "../HomeMenuComponent/HomeMenuComponent";
import MainHomeComponent from "../MainHomeComponent/MainHomeComponent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "../../UI/Spinner/Spinner";

const HomeComponent = () => {
  const [userId, setUserId] = useState("");
  const [userEmailId, setUserEmailId] = useState("");
  const [userError, setUserError] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmailId(user.email);
        setUserError(false);
      } else {
        setUserId("");
        setUserEmailId("");
        setUserError(true);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userError && userId) {
    return (
      <div>
        <HomeMenuComponent />
        <MainHomeComponent userId={userId} userEmailId={userEmailId} />
      </div>
    );
  } else if (userError) {
    return (
      <Spinner message="Something went Wrong, Maybe your login session expired :(" />
    );
  } else {
    return <Spinner />;
  }
};

export default HomeComponent;
