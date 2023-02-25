import React, { useState, useEffect } from "react";

import "./App.css";

const App: React.FC = () => {
  // declaring Constants
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [repos, setRepos] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [nameRepo, setNameRepo] = useState("");
  const [urlRepo, setUrlRepo] = useState("");
  const [descriptionRepo, setDescriptionRepo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [starred, setStarred] = useState(false);

  // declaring User Token & url
  const token = "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";
  const url = "https://api.github.com/user";
  const reposUrl = "https://api.github.com/user/repos?sort=created";

  // fetching user Data and putting it into .json
  const updateList = () => {
    fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // user info gets pumped into these variables
        setData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    const setData = (object: {
      name: string;
      login: string;
      location: string;
      avatar_url: string;
      bio: string;
    }) => {
      setName(object.name);
      setLogin(object.login);
      setLocation(object.location);
      setAvatar(object.avatar_url);
      setBio(object.bio);
    };

    // fetching repo data
    fetch(reposUrl, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // repo data gets pumped into repos array
        setRepos(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // extracting data into the Variables

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: nameRepo,
      private: !isPublic,
      homepage: urlRepo,
      descriptionRepo,
    };
    fetch(reposUrl, {
      method: "POST",
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(JSON.stringify(data));
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Request success: ", data);
      })
      .catch((error) => {
        console.log("Request error: ", error);
      });
    formReset();
    updateList();
  };
  const handleAccordionClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const formReset = () => {
    const form = document.getElementById("form") as HTMLFormElement;
    form.reset();
  };

  const handleStarClick = (starred: boolean, owner: string, repo: string) => {
    const url = `https://api.github.com/user/starred/${owner}/${repo}`;
    const method = starred ? "DELETE" : "PUT";
    console.log(starred);
    fetch(url, {
      method: method,
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .then((data) => {
        console.log("Starred/unstarred successfully:", data);
        console.log(method);
        // update the starred state in the repos array
      })
      .catch((error) => {
        console.error("Star/unstar error:", error);
      });
    updateList();
  };

  // rendering Webpage
  return (
    <div className="App">
      <div className="container">
        <div className="container">
          <div className="logoWrapper">
            <img src={avatar} alt="User Avatar" />
          </div>
          <h1>{name}</h1>

          <div className="accountInfo">
            <div className="login">
              <h2>@{login}</h2>
            </div>
            <div className="location">
              <h2>{location}</h2>
            </div>
          </div>
          <div className="bio">
            <h3>{bio}</h3>
          </div>
        </div>
        <button onClick={updateList}>LOGIN</button>
        <div className="container">
          <div className="accordion">
            <div className="accordion-item">
              <div className="accordianTitle">
                <h1 className="accordion-title" onClick={handleAccordionClick}>Creer un nouveau repository</h1>
                <h1>+</h1>
              </div>

              {isOpen && (
                <div className="accordion-content">
                  <form id="form" onSubmit={handleSubmit}>
                    <div className="formElement">
                      <label>Publier en privee ? </label>
                      <input
                        type="checkbox"
                        name="publicPrivate"
                        onChange={(event) => setIsPublic(event.target.checked)}
                      />
                    </div>
                    <div className="formElement">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        onChange={(event) => setNameRepo(event.target.value)}
                        required
                      />
                    </div>
                    <div className="formElement">
                      <label>URL</label>
                      <input
                        type="text"
                        name="url"
                        onChange={(event) => setUrlRepo(event.target.value)}
                      />
                    </div>
                    <div className="formElement">
                      <label>Description</label>
                      <input
                        type="text"
                        name="description="
                        onChange={(event) =>
                          setDescriptionRepo(event.target.value)
                        }
                      />
                    </div>
                    <button type="submit">Soumettre</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <ul>
          {repos.length > 0 ? (
            repos.map((repo: any) => (
              <li key={repo.id}>
                <div className="title">
                  <h2>{repo.name}</h2>
                  <span>{repo.stargazers_count} stars</span>
                </div>
                <h3>{repo.owner.login}</h3>
                <a href={repo.html_url}>{repo.html_url}</a>
                <button
                  className="starred"
                  onClick={() =>
                    handleStarClick(
                      repo.stargazers_count,
                      repo.owner.login,
                      repo.name
                    )
                  }
                >
                  STAR
                </button>
              </li>
            ))
          ) : (
            <li>No repositories found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
