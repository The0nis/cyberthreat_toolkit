
# CYBER Toolkit
> **Warning**
> CYBER Toolkit is not production ready yet. This is an early prototype, that still needs some work to be done. 
## A fullstack web application built for security analysts



Cyber Toolkit is a full-stack web application designed to assist security analysts in their work. It combines various functions and services into a single tool, making it easier for analysts to identify potential threats and stay updated with the latest developments in the field of cybersecurity.

* [Integrated services](#integrated-services)
* [Features](#features)
  * [Newsfeed](#features)
  * [Email Analyzer](#features)
  * [IOC Analyzer](#ioc-analyzer)
  * [CVSS Calculator](#cvss-calculator)
  * [GUI to create Sigma rules](#rules)
  * [Customizability](#customizable)
* [Planned features](#planned-features-for-later-versions)


## Integrated services
| IPs            | Domains       | URLs                 | Emails           | Hashes     | CVEs     |
|----------------|---------------|----------------------|------------------|------------|----------|
| AbuseIPDB      | Alienvault    | Alienvault           | Emailrep.io      | Alienvault | GitHub   |
| Alienvault     | Checkphish.ai | Checkphish.ai        | GitHub           | GitHub     | NIST NVD |
| Checkphish.ai  | GitHub        | GitHub               | Hunter.io        | Maltiverse |          |
| CrowdSec       | Maltiverse    | Google Safe Browsing | Have I Been Pwnd | Pulsedive  |          |
| GitHub         | Pulsedive     | Maltiverse           | Reddit           | Reddit     |          |
| IPQualityScore | Shodan        | Pulsedive            | Twitter          | ThreatFox  |          |
| Maltiverse     | ThreatFox     | Shodan               |                  | Twitter    |          |
| Pulsedive      | Reddit        | ThreatFox            |                  | Virustotal |          |
| Shodan         | Twitter       | Reddit               |                  |            |          |
| Reddit         | URLScan       | Twitter              |                  |            |          |
| ThreatFox      | Virustotal    | URLScan              |                  |            |          |
| Twitter        |               | Virustotal           |                  |            |          |
| Virustotal     |               |                      |                  |            |          |

## Features
### Newsfeed
The Newsfeed module keeps you informed about the latest cybersecurity news by aggregating articles from trusted sources such as Wired, The Hacker News, Security Magazine, Threatpost, TechCrunch Security, and Dark Reading. Stay up-to-date with industry trends and potential threats without having to visit multiple websites or subscribe to numerous newsletters.


### IOC Analyzer
The IOC Analyzer module helps you analyze different types of indicators of compromise (IOCs) such as IP addresses, hashes, email addresses, domains, and URLs. It leverages services like VirusTotal, AlienVault, AbuseIPDB, and social media platforms like Reddit and Twitter to gather information about the IOCs. The module automatically detects the type of IOC being analyzed and utilizes the appropriate services to provide relevant information, enabling you to identify potential threats and take necessary actions to protect your organization.


### Email Analyzer
The Email Analyzer module allows you to analyze .eml files for potential threats. Simply drag and drop an .eml file into the module, and it will parse the file, perform basic security checks, extract indicators of compromise (IOCs), and analyze messages with the help of AI. Analyze the IOCs using various open-source intelligence (OSINT) services, and enhance your organization's email security.


### CVSS Calculator
The CVSS Calculator module allows you to calculate the CVSS 3.1 score of a vulnerability and export the calculation as a markdown or JSON file.


### Rules
The Rules module is a GUI for creating Sigma rules.




### Customizable
Customize the descriptions of each module with your own markdown-formatted text. Disable any modules that are not needed, and they will not be shown. Tailor the toolkit to your specific requirements.


## Planned features for later versions
- Add more CyberThreat services
- Generate hashes from files to analyse them in a privacy-friendly way.
- Export reports
- Save history and generate statistics
- Metadata viewer

## Deploy with concurrently
1. Download the repository and extract the files
2. After Installing packages for the frontend and backend
3. Navigate to the directory  "cyberthreat_toolkit" 
4. Run the following command: `npm start`
5. Once it is running, you can access the app in your browser at http://localhost:3000

## Deploy from source
### Prerequisites
- Node.js 17 or higher with NPM
- Port 3000 and 8000 available

### Installing Backend Packages
#### Windows
1. Navigate to the backend folder and Install required packages: `npm install`
2. Start backend: `node app`
3. Access the app in your browser at http://localhost:8000



### Installing Frontend Packages
1. naviagte to frontend folder and Install required packages: `npm install`
2. Start frontend: `npm start`
3. Access the app in your browser at http://localhost:3000
