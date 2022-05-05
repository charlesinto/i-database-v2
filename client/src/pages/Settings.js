const Settings = () => {
  return (
    <div className="container">
      <div className="py-4">
        <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
          <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
            <li className="breadcrumb-item">
              <a href="#">
                <svg
                  className="icon icon-xxs"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Settings
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card border-0 shadow components-section">
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-lg-12 col-sm-12">
                  <div className="mb-4">
                    <label for="actionValue">Action Value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Step 1 up value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Step 2 up value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Step 3 up value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-4">
                    <label for="textarea">
                      Email Recipients(separated by commma)
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter your message..."
                      id="textarea"
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    for="flexSwitchCheckChecked"
                  >
                    Send Mail to Recipient
                  </label>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-primary d-inline-flex align-items-center"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
