function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="container">

      <div className="hero">

        <h1>
          Welcome,
          {" "}
          {user?.displayName}
        </h1>

        <p>
          Your AI-powered insurance
          dashboard is ready.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;