import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) {
      return '?';
    }

    const words = name.trim().split(' ');

    if (words.length === 1) {
      return words[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <section className="page-container">

      <div className="page-header">
        <h1>Profile</h1>
        <p>
          View your account information.
        </p>
      </div>

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            {getInitials(user?.name)}
          </div>

          <div>
            <h2>
              {user?.name}
            </h2>

            <p>
              {user?.email}
            </p>
          </div>

        </div>

        <div className="profile-divider" />

        <div className="profile-info">

          <div className="profile-info-item">
            <span className="profile-label">
              Full Name
            </span>

            <span className="profile-value">
              {user?.name}
            </span>
          </div>

          <div className="profile-info-item">
            <span className="profile-label">
              Email Address
            </span>

            <span className="profile-value">
              {user?.email}
            </span>
          </div>

          <div className="profile-info-item">
            <span className="profile-label">
              Account ID
            </span>

            <span className="profile-value">
              #{user?.id}
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}