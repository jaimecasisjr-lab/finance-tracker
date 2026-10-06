import { useEffect, useState } from 'react';

const DEFAULT_SETTINGS = {
  currency: 'USD',
  theme: 'dark',
};

export default function Settings() {
  const [settings, setSettings] =
    useState(() => {
      const savedSettings =
        localStorage.getItem(
          'financeTrackerSettings'
        );

      return savedSettings
        ? JSON.parse(savedSettings)
        : DEFAULT_SETTINGS;
    });

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme =
      settings.theme;
  }, [settings.theme]);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      'financeTrackerSettings',
      JSON.stringify(settings)
    );

    setSaved(true);
  };

  return (
    <section className="page-container">

      <div className="page-header">
        <h1>Settings</h1>

        <p>
          Customize your Finance Tracker
          preferences.
        </p>
      </div>

      <div className="settings-card">

        <div className="settings-section">

          <h2>General</h2>

          <p className="settings-description">
            Choose how your financial
            information is displayed.
          </p>

          <div className="settings-field">

            <div>
              <label htmlFor="currency">
                Currency
              </label>

              <p>
                Choose the currency used for
                transaction amounts.
              </p>
            </div>

            <select
              id="currency"
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="settings-select"
            >
              <option value="USD">
                USD ($)
              </option>

              <option value="PHP">
                PHP (₱)
              </option>

              <option value="EUR">
                EUR (€)
              </option>

              <option value="GBP">
                GBP (£)
              </option>

              <option value="JPY">
                JPY (¥)
              </option>
            </select>

          </div>

        </div>

        <div className="settings-divider" />

        <div className="settings-section">

          <h2>Appearance</h2>

          <p className="settings-description">
            Choose the appearance of the
            application.
          </p>

          <div className="settings-field">

            <div>
              <label htmlFor="theme">
                Theme
              </label>

              <p>
                Choose between dark and light
                mode.
              </p>
            </div>

            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="settings-select"
            >
              <option value="dark">
                Dark
              </option>

              <option value="light">
                Light
              </option>
            </select>

          </div>

        </div>

        <div className="settings-actions">

          {saved && (
            <span className="settings-saved">
              Settings saved.
            </span>
          )}

          <button
            type="button"
            className="button button-primary"
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>

    </section>
  );
}