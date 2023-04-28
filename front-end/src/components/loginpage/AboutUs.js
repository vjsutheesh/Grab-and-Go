import Grab from "./Grab.png";
import Profile from "./profile.jpg";

const AboutUs = () => {
  return (
    <>
      <div className="background-container">
        <div className="header">
          <div className="left">
            <div className="logo">
              <img src={Grab} alt="Loading...." />
            </div>
            <div className="title">Grab & Go</div>
          </div>
          <div className="right">
            <a href="contactus" className="auth-contact">
              Contact Us
            </a>
            <a href="/" className="auth-login">
              Login
            </a>
          </div>
        </div>
        <div className="content">
          <div className="kanish">
            <img className="image" src={Profile} alt="Loading..." />
            <div className="profile-details">
              <div className="name name-kanish">Kanish</div>
              <div className="role">Chief Executive Officer</div>
              <div className="social-media-link">
                <a href="mailto: kanishshivan@gmail.com">
                  <i class="fa fa-envelope fa-lg"></i>
                </a>
                <a href="#">
                  <i class="fa fa-instagram fa-lg"></i>
                </a>
                <a href="#">
                  <i class="fa fa-linkedin fa-lg"></i>
                </a>
                <a href="#">
                  <i class="fa fa-twitter fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="sutheesh">
            <img className="image" src={Profile} alt="Loading..." />
            <div className="profile-details">
              <div className="name name-sutheesh">Sutheesh</div>
              <div className="role">Chief Executive Officer</div>
              <div className="social-media-link">
                <a href="#">
                  <i class="fa fa-envelope fa-lg"></i>
                </a>
                <a href="#">
                  <i class="fa fa-instagram fa-lg"></i>
                </a>
                <a href="#">
                  <i class="fa fa-linkedin fa-lg"></i>
                </a>
                <a href="#">
                  <i class="fa fa-twitter fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mouli">
            <img className="image" src={Profile} alt="Loading..." />
            <div className="profile-details">
              <div className="name name-mouli">Mouli Karthik</div>
              <div className="role">Chief Executive Officer</div>
              <div className="social-media-link">
                <a href="mailto: moulikarthik9964@gmail.com">
                  <i class="fa fa-envelope fa-lg"></i>
                </a>
                <a href="https://instagram.com/mouli_karthik?igshid=ZDdkNTZiNTM=">
                  <i class="fa fa-instagram fa-lg"></i>
                </a>
                <a href="https://www.linkedin.com/in/mouli-karthik-s-591694214">
                  <i class="fa fa-linkedin fa-lg"></i>
                </a>
                <a href="https://twitter.com/MouliKarthik6?t=DzJnsMqNWujUYJ3NPuZqtA&s=08">
                  <i class="fa fa-twitter fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
