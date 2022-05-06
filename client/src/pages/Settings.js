import { useCallback, useEffect, useState } from "react";
import {
  getSettingConfiguration,
  updateSettingConfiguration,
} from "../api/report.api";

const Settings = () => {
  const [emailToken, setEmailToken] = useState("");
  const [webhookUrl, setWebookUrl] = useState("");
  const [botID, setBotId] = useState("");
  const [actionvalue, setActionValue] = useState("");
  const [amount, setAmount] = useState("");
  const [autoSendMail, setAutoSendMail] = useState(false);
  const [set1up, setSetp1Up] = useState("");
  const [set2up, setSetp2Up] = useState("");
  const [set3up, setSetp3Up] = useState("");
  const [set4up, setSetp4Up] = useState("");
  const [emailRecipients, setEmailRecipients] = useState("");
  const handleFormSubmit = async () => {
    try {
      await updateSettingConfiguration({
        email_token: emailToken,
        bot_id: botID,
        webhook: webhookUrl,
        amount: amount,
        action_value: actionvalue,
        auto_action: autoSendMail,
        emailRecipients: emailRecipients,
        step1up: +set1up,
        step2up: +set2up,
        step3up: +set3up,
        step4up: +set4up,
      });

      alert("successful");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getConfiguration = useCallback(async () => {
    try {
      const response = await getSettingConfiguration();

      setActionValue(response.data.data.action_value);
      setEmailToken(response.data.data.email_token);
      setBotId(response.data.data.bot_id);
      setSetp1Up(response.data.data.step1up);
      setSetp2Up(response.data.data.step2up);
      setSetp3Up(response.data.data.step3up);
      setWebookUrl(response.data.data.webhook);
      setSetp4Up(response.data.data.step4up);
      setAutoSendMail(response.data.data.auto_action);
      setAmount(response.data.data.amount);
      setEmailRecipients(response.data.data.emailRecipients);
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  useEffect(() => {
    getConfiguration();
  }, []);
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
                    <label for="emailToken">Email Token</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailToken"
                      aria-describedby="emailHelp"
                      value={emailToken}
                      onChange={(e) => setEmailToken(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="webhookUrl">Webhook URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="webhookUrl"
                      aria-describedby="emailHelp"
                      value={webhookUrl}
                      onChange={(e) => setWebookUrl(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="botId">Bot ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="botId"
                      aria-describedby="emailHelp"
                      value={botID}
                      onChange={(e) => setBotId(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Action Value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                      value={actionvalue}
                      onChange={(e) => setActionValue(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Step 1 up value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                      value={set1up}
                      onChange={(e) => setSetp1Up(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Step 2 up value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                      value={set2up}
                      onChange={(e) => setSetp2Up(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Step 3 up value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                      value={set3up}
                      onChange={(e) => setSetp3Up(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="actionValue">Step 3 up value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="actionValue"
                      aria-describedby="emailHelp"
                      value={set4up}
                      onChange={(e) => setSetp4Up(e.target.value)}
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
                      value={emailRecipients}
                      onChange={(e) => setEmailRecipients(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    onChange={(e) => setAutoSendMail((state) => !state)}
                    checked={autoSendMail}
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
                onClick={handleFormSubmit}
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
