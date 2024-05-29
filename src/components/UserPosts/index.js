import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import "./userposts.css";
export default function UserPosts({ response }) {
  return (
    <div className="card flex gap-3 justify-content-center -mt-5 w-full">
      <>
        {" "}
        <TabView>
          <TabPanel header="Posts">
            <div className="posts-grid">
              {response.map((item) => (
                <Card
                  key={item._id}
                  header={
                    <img
                      alt="Card"
                      src={item.post.url}
                      style={{ height: "18rem" }}
                    />
                  }
                  className="post-card"
                />
              ))}
            </div>
          </TabPanel>
          <TabPanel header="Reels">
            <div className="posts-grid">
              <Card
                header={
                  <h1 style={{ height: "18rem", width: "1240px" }}>
                    reels here
                  </h1>
                }
              />
            </div>
          </TabPanel>
          <TabPanel header="Saved">
            <div className="posts-grid">
              <Card
                header={
                  <h1 style={{ height: "18rem", width: "1240px" }}>
                    Saved posts here
                  </h1>
                }
              />
            </div>
          </TabPanel>
        </TabView>
      </>
    </div>
  );
}
