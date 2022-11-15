import { Editor } from "./Editor";
import Projects from "./Projects/Projects";

export default function Main({ marginTop, user, setUser, project, filter }) {

  if (user && setUser) {
    return <Editor user={user} setUser={setUser} marginTop={marginTop} />;
  } else if (project) {
    return <Projects project={project} marginTop={marginTop} />;
  } else if (filter) {
    return <Projects filter={filter} marginTop={marginTop} />;
  } else {
    return <div style={{display:"contents"}}>
        <Projects marginTop={marginTop} />
        
    </div>;
  }
}
