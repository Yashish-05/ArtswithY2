import "./AuthLayout.css";

const AuthLayout = ({ title, subtitle, children }) => {

    return (

        <div className="auth-page">

            {/* Background Decorations */}

            <div className="gradient-circle circle-one"></div>

            <div className="gradient-circle circle-two"></div>

            <div className="gradient-circle circle-three"></div>

            <div className="auth-container">

                {/* Left Branding Section */}

                <div className="auth-left">

                    <h1>🎨 Artswith_y2</h1>

                    <h2>Compete • Create • Inspire</h2>

                    <p>

                        Join creative artists from around the world.

                        Participate in exciting challenges,

                        showcase your talent,

                        and earn a place in the Hall of Fame.

                    </p>

                </div>

                {/* Right Form Section */}

                <div className="auth-right">

                    <div className="auth-card">

                        <h2>{title}</h2>

                        <p>{subtitle}</p>

                        {children}

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AuthLayout;