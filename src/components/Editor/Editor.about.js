import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { handleGetAbout, uploadAbout } from "../../utils/firebase/firebase.service";
import { state } from "../../utils/state";

export default function AboutForm() {
    const snap = useSnapshot(state);
  const [saved, setSaved] = useState(false);
    useEffect(() => { handleGetAbout(); }, [])

    return (
      <div className="formWrap">
        {saved ? (
            <>
                <p>Changes Saved!</p>
                <button onClick={() => window.location.reload(false)}>
                    Post Again
                </button>
            </>
        ) : (
            <div className="about-form">
                <h1>About</h1>
                <textarea
                    name="about"
                    id="about"
                    cols="30"
                    rows="10"
                    placeholder="About"
                    value={snap.about}
                    onChange={(e) => (state.about = e.target.value)}
                ></textarea>
                    <button onClick={() => { uploadAbout(); setSaved(true); }}>Submit</button>
            </div>)}
    </div>
    );
}