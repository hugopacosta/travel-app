import { checkUrl } from './urlChecker'

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate').addEventListener('click', retrieveAnalysis);
});

function retrieveAnalysis(e){
    e.preventDefault();
    const urlInput = document.getElementById('url-input').value;
    if(checkUrl(urlInput)){
        document.getElementById('status').innerHTML = 'Loading...'
        getSentimentAnalysis(urlInput)
        .then(function(data){
            console.log(data);
        });
    } else {
        document.getElementById('status').innerHTML = 'Invalid URL'
        cleanUI();
    }
}

const getSentimentAnalysis = async (urlInput)=>{
    console.log(urlInput)
    fetch('http://localhost:8081/sentiment-analysis', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({url: urlInput})
    })
    .then(response => response.json())
    .then(response => updateUI(response))
}

function updateUI(response){
    document.getElementById('status').innerHTML = 'Success!'
    document.getElementById('agreement').innerHTML = `${response.agreement}`
    document.getElementById('confidence').innerHTML = `${response.confidence}`
    document.getElementById('irony').innerHTML = `${response.irony}`
    document.getElementById('subjectivity').innerHTML = `${response.subjectivity}`
    document.getElementById('score').innerHTML = `${response.score_tag}`
}

function cleanUI(){
    document.getElementById('agreement').innerHTML = '';
    document.getElementById('confidence').innerHTML = '';
    document.getElementById('irony').innerHTML = '';
    document.getElementById('subjectivity').innerHTML = '';
    document.getElementById('score').innerHTML = '';
}

export { retrieveAnalysis, updateUI }
