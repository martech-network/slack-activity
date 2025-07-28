// Load Slack API helper library
loadLibrary("dg:slackNotify.js");

var _Obj_;
var Obj;
var payload;
var slackTemplate;

if (activity.mode == 1 && activity.slackTemplate_name) {
  var slackTemplate = xtk.javascript.load(activity.slackTemplate_namespace+":"+activity.slackTemplate_name).data;
} else if (activity.mode == 0) {
  var slackTemplate = activity.script;
}

// Remove single-line comments outside of payload
var _Obj_ = slackTemplate.replace(/^\/\/.*$/gmi, ""); 

//replace placeholders dynamically
var Obj   = _Obj_.replace(/\<\%\=(.+?)\%\>/gmi, function (matched) {
    try {
        return Function('return ' + matched.replace(/[^a-zA-Z0-9."() _]/g, ''))();
    } catch (e) {
        logWarning("Placeholder parsing error: " + e);
        return matched; // Keep original placeholder if there's an error
    }
});


logInfo(activity.slackTemplate_name) //troubleshooting
logInfo(activity.mode) //troubleshooting

// Validate JSON before parsing to avoid errors

try {
    payload = JSON.parse(Obj);
    payload.channel = extAccount() ? extAccount().account : "default-channel"; // Safe handling, define a fallback slack channel

} catch (e) {
    logWarning("JSON Parsing Error: " + e);
    payload = {}; // Prevent execution failure
}

// Slack alert execution function
function slackAlert_call() {}

// Retry mechanism for Slack API call
function slackAlert_recall() {
    try {
        slackNotify(JSON.stringify(payload));
        task.postEvent(task.doneTransition());
        task.setCompleted();
        return 0;
    } catch (e) {
        logWarning("Slack API Call Failed: " + e);
        task.postEvent(task.errorTransition());
    }
}
