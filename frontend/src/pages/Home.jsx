import React from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";

const Home = () => {
  const { songs, albums } = SongData();
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albums.map((e, i) => (
            <AlbumItem
              key={i}
              image={e.thumbnail.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="overflow-x-auto relative">
          <div className="flex animate-scroll">
            {/* Hiển thị các phần tử */}
            {songs.map((e, i) => (
              <SongItem
                key={i}
                image={e.thumbnail.url}
                name={e.title}
                desc={e.description}
                id={e._id}
              />
            ))}
            {/* Sao chép lại các phần tử để nối đầu và cuối */}
            {songs.map((e, i) => (
              <SongItem
                key={i + songs.length}
                image={e.thumbnail.url}
                name={e.title}
                desc={e.description}
                id={e._id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Recommended Station</h1>
        <div className="overflow-x-auto relative">
          <div className="flex animate-scroll">
            {/* Hiển thị các phần tử */}
            {songs.map((e, i) => (
              <SongItem
                key={i}
                image={e.thumbnail.url}
                name={e.title}
                desc={e.description}
                id={e._id}
              />
            ))}
            {/* Sao chép lại các phần tử để nối đầu và cuối */}
            {songs.map((e, i) => (
              <SongItem
                key={i + songs.length}
                image={e.thumbnail.url}
                name={e.title}
                desc={e.description}
                id={e._id}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
