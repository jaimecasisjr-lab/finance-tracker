import { useRef, useState } from 'react';

import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  const fileInputRef = useRef(null);

  const [profilePhoto, setProfilePhoto] =
    useState(() =>
      localStorage.getItem('profilePhoto')
    );

  const [photoError, setPhotoError] =
    useState('');

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

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same photo again.
    event.target.value = '';

    if (!file) {
      return;
    }

    setPhotoError('');

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select an image file.');
      return;
    }

    if (
      !['image/jpeg', 'image/png', 'image/webp'].includes(
        file.type
      )
    ) {
      setPhotoError('Please use a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('Please choose an image smaller than 5 MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement('canvas');

        const maxSize = 400;

        const scale = Math.min(
          maxSize / image.width,
          maxSize / image.height,
          1
        );

        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext('2d');

        if (!context) {
          setPhotoError('Unable to process this image.');
          return;
        }

        context.drawImage(
          image,
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Compress the image to reduce storage usage.
        const compressedPhoto = canvas.toDataURL(
          'image/jpeg',
          0.8
        );

        try {
          localStorage.setItem(
            'profilePhoto',
            compressedPhoto
          );

          setProfilePhoto(compressedPhoto);
        } catch {
          setPhotoError(
            'Unable to save the photo. Try a smaller image.'
          );
        }
      };

      image.onerror = () => {
        setPhotoError('Unable to open this image.');
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      setPhotoError('Unable to read this image.');
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    localStorage.removeItem('profilePhoto');

    setProfilePhoto(null);
    setPhotoError('');
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
          <div className="profile-photo-container">
            <button
              type="button"
              className="profile-avatar profile-avatar-button"
              onClick={handlePhotoClick}
              aria-label="Upload profile photo"
              title="Change profile photo"
            >
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Your profile"
                  className="profile-photo"
                />
              ) : (
                getInitials(user?.name)
              )}

              <span className="profile-photo-overlay">
                ✎
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
              hidden
            />
          </div>

          <div className="profile-heading-info">
            <h2>{user?.name}</h2>

            <p>{user?.email}</p>

            <button
              type="button"
              className="profile-photo-link"
              onClick={handlePhotoClick}
            >
              {profilePhoto
                ? 'Change photo'
                : 'Upload photo'}
            </button>

            {profilePhoto && (
              <button
                type="button"
                className="profile-remove-photo"
                onClick={handleRemovePhoto}
              >
                Remove photo
              </button>
            )}
          </div>
        </div>

        {photoError && (
          <p className="profile-photo-error" role="alert">
            {photoError}
          </p>
        )}

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