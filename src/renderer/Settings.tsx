import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [apiPath, setApiPath] = useState('');

  useEffect(() => {
    // Load existing API path
    const savedPath = window.electron.store.get('apiPath');
    if (savedPath && typeof savedPath === 'string') {
      setApiPath(savedPath);
    }
  }, []);

  const handleSave = () => {
    window.electron.store.set('apiPath', apiPath);
    window.electron.ipcRenderer.closeSettingsWindow();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiPath(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Settings</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="apiPath" className="form-label">
                  API Path
                  <input
                    type="text"
                    className="form-control"
                    id="apiPath"
                    value={apiPath}
                    onChange={handleChange}
                    placeholder="Enter API URL"
                  />
                </label>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    window.electron.ipcRenderer.closeSettingsWindow()
                  }
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
