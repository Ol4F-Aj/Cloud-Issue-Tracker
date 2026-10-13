//step1
const fs = require('fs/promises');
const path =require('path');
const { randomUUID } =require('crypto');
//step2
const DATA_FILE = path.join(__dirname, '..', 'data', 'issues.json');

//step3
async function readIssues () {
try {
const text = await fs.readFile (DATA_FILE, 'utf8');
return JSON.parse(text);
} catch (error) {
if (error.code === 'ENOENT') return [];
throw error;
}
}

//step4
async function writeIssues (issues) 
{
    await fs.writeFile (DATA_FILE, JSON.stringify(issues, null, 2));
}

//step5
async function createIssue (input) 
{ 
const issues = await readIssues(); 
const issue = 
{
id: randomUUID(),
title: input.title.trim(),
description: input.description.trim(),
priority: input.priority,
status: 'Open',
createdAt: new Date().toISOString()
};
issues.push(issue);
await writeIssues (issues);
return issue;
}

//step6
async function updateIssueStatus (id, status) {
const issues = await readIssues();
const issue=issues.find((item) => item.id === id);
if (!issue) return null;
issue.status = status;
await writeIssues (issues); 
return issue;
}

//step7
module.exports = { readIssues, createIssue, updateIssueStatus};
