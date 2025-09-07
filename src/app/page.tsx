import FormWizardClient from "@/components/FormWizardClient";

export default function Home() {
  return (
    <>
      {/* Hidden form for Netlify Forms */}
      <form
        name="survey"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
      >
        <input type="text" name="datetime" />
        <input type="text" name="gender" />
        <input type="text" name="dating_experience" />
        <input type="text" name="goals" />
        <input type="text" name="personality" />
        <input type="text" name="interests" />
        <input type="text" name="lifestyle" />
        <input type="text" name="hair_color" />
        <input type="text" name="age_preference" />
        <input type="text" name="age" />
        <input type="text" name="location" />
        <input type="text" name="traffic_source" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="utm_campaign" />
        <input type="text" name="utm_content" />
        <input type="text" name="utm_source" />
        <input type="text" name="bot-field" />
      </form>
      <FormWizardClient />
    </>
  );
}
