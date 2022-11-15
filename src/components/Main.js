import React, { Suspense } from "react";
const About = React.lazy(() =>
  import(/* webpackChunkName: "About" */ "./About")
);
const Editor = React.lazy(() =>
  import(/* webpackChunkName: "Editor" */ "./Editor")
);
const Projects = React.lazy(() =>
  import(/* webpackChunkName: "Projects" */ "./Projects/Projects")
);
const Home = React.lazy(() =>
  import(/* webpackChunkName: "Home" */ "./Home")
);
// import { Shop } from "./components/Shop";

export default function Main({
  marginTop,
  user,
  setUser,
  project,
  filter,
    about
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {setUser ? (
        <Editor user={user} setUser={setUser} marginTop={marginTop} />
      ) : null}
      {project ? <Projects project={project} marginTop={marginTop} /> : null}
      {filter ? <Projects filter={filter} marginTop={marginTop} /> : null}
      {about ? <About marginTop={marginTop} /> : null}
      {!setUser && !project && !filter && !about ? (
        <Home marginTop={marginTop} />
      ) : null}
    </Suspense>
  );
}
