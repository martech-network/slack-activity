// Function to retrieve external account details
function extAccount() {

    if(activity.extAccount_id == 0){
      logError("Slack external account not configured in alert.")
      
      return null
      } else {    
        try {       
            return nms.extAccount.load(activity.extAccount_id);
        } catch (e) {
            logWarning("Failed to load external account: " + e);
            return null; // Prevent execution failure
        }
    }
}

// Slack API request function
function slackNotify(payload) {

    var account = extAccount();
    if (!account) {
        logError("External account missing, unable to send Slack notification.");
        return;
    }

    var req = new HttpClientRequest(account.server);
    var bearer = decryptString(account.password); // Requires XtkSecurity_Unsafe_DecryptString option
    
    req.header["Authorization"] = "Bearer " + bearer;
    req.header["Content-Type"] = "application/json; charset=utf-8";
    req.method = "POST";
    req.body = payload;

    try {
        req.connect();
        req.execute();

        // Log response for debugging
        logInfo("Slack API Response Code: " + req.response.code);
        if (req.response.code !== 200) {
            throw("Slack API response: " + req.response.code);
        }
    } catch (exception) {
        logError("Slack API exception: " + exception);
    } finally {
        req.disconnect();
    }
}
