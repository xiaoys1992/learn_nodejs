const keys = require('../../config/keys');
module.exports = (survey) => {

    return `
    <html>
    <body>
    <div style="text-align: center;">
    <h3>${survey.title}</h3>
    <p>${survey.body}</p>
    <div>
    <a href="${keys.redirectDomain}/api/survey/${survey._id}/yes">Yes</a>
    </div>
    <div>
    <a href="${keys.redirectDomain}/api/survey/${survey._id}/no">No</a>
    </div>
    </div>
    </body>
    </html>
    
    `;
};