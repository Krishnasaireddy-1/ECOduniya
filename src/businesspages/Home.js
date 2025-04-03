import "./home.css";

const Home = () => {
  return (
    <div className="main-bdr">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-ctnt">
          <h1>Turning Waste into Value for a Cleaner Tomorrow.</h1>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Key Features of Our Waste Management Solution</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Efficient Waste Sorting</h3>
            <p>
              Our project focuses on automating the waste sorting process to
              reduce human error and ensure more efficient recycling.
            </p>
          </div>
          <div className="feature-item">
            <h3>Smart Collection System</h3>
            <p>
              A smart waste collection system that optimizes pick-up routes and
              schedules to reduce fuel consumption and improve service delivery.
            </p>
          </div>
          <div className="feature-item">
            <h3>Recycling & Waste Conversion</h3>
            <p>
              Transforming waste materials into valuable products, reducing
              landfill waste, and promoting sustainability.
            </p>
          </div>
          <div className="feature-item">
            <h3>Community Engagement</h3>
            <p>
              Engaging local communities to raise awareness and promote proper
              waste disposal and recycling practices.
            </p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          We are a dedicated team working to revolutionize waste management for
          a cleaner and greener future. Our goal is to transform waste into
          valuable resources, reduce environmental impact, and create a more
          sustainable future for communities worldwide.
        </p>
        <p>
          Our solution combines technology, innovation, and community
          engagement to tackle the pressing issue of waste management. Join us in
          creating a cleaner tomorrow.
        </p>
      </div>

      {/* Call to Action Section */}
      <div className="cta">
        <h2>Get Involved Today!</h2>
        <p>
          Join our efforts in making a significant impact on the environment.
          Whether you're a community member, business, or organization, we
          invite you to be part of this exciting journey towards sustainable waste
          management.
        </p>
        <button className="cta-btn">Learn More</button>
      </div>
    </div>
  );
};

export default Home;