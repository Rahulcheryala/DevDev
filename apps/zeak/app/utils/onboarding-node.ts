export const nodeModalValues = {
  trigger: "trigger",
  dataPrep: "onboarding-form",
  communication: "communication",
  wait: "wait",
  dataValidation: "data-validation",
  integration: "integration",
  automation: "automation",
  review: "review",
  communicationContract: "communication-contract",
  waitContract: "wait-contract",
  integrationContract: "integration-contract",
  notification: "notification",
};

export const reminderEmailTemplate = `
<h2>Reminder: Complete Your Vendor Onboarding Process</h2>
<p>Dear <strong>[Vendor Name]</strong>,</p>
<p>This is a friendly reminder to complete your vendor onboarding process with <strong>[Your Company Name]</strong>. We noticed that some steps are still pending, and we want to ensure a smooth start to our partnership.</p>

<h3>Pending Steps:</h3>
<p>Please access the links below to complete the required actions:</p>
<ul>
  <li>Set up your profile: <a href="#" target="_blank"><strong>Complete My Profile</strong></a></li>
  <li>Submit required documents: <a href="#" target="_blank"><strong>Upload Documents</strong></a></li>
  <li>Review and sign agreements: <a href="#" target="_blank"><strong>Sign Agreements</strong></a></li>
  <li>Schedule an introductory call: <a href="#" target="_blank"><strong>Book a Call</strong></a></li>
</ul>

<p>Completing these steps will allow us to finalize your onboarding and begin our collaboration as soon as possible. If you have already completed the process, please disregard this email.</p>

<p>If you need assistance or have any questions, feel free to contact us at <a href="mailto:[support email address]">[support email address]</a> or call us at <strong>[support phone number]</strong>.</p>

<p>We appreciate your prompt attention to this matter and look forward to working with you!</p>

<p>Best regards,</p>
<p><strong>[Your Full Name]</strong><br/>
[Your Job Title]<br/>
[Your Company Name]<br/>
[Contact Information]</p>
`;

export const contractEmailTemplate = `
<h2>Action Required: Review and Sign Your Vendor Contract</h2>
<p>Dear <strong>[Vendor Name]</strong>,</p>
<p>We are pleased to move forward with your onboarding process at <strong>[Your Company Name]</strong>. To finalize your vendor setup, please review and sign your vendor contract at the link below:</p>

<p><a href="#" target="_blank" style="color: #007BFF; font-weight: bold;">Review and Sign Contract</a></p>

<p>Steps to Complete:</p>
<ol>
  <li>Click the link above to access your contract.</li>
  <li>Review the terms and conditions carefully.</li>
  <li>Provide your electronic signature to confirm agreement.</li>
</ol>

<p>Once signed, we will process your details and complete the onboarding process. If you have any questions or require clarification on any part of the contract, please don’t hesitate to contact us at <a href="mailto:[support email address]">[support email address]</a> or call <strong>[support phone number]</strong>.</p>

<p>We’re excited to begin this partnership and look forward to working with you!</p>

<p>Best regards,</p>
<p><strong>[Your Full Name]</strong><br/>
[Your Job Title]<br/>
[Your Company Name]<br/>
[Contact Information]</p>
`;
