import ContactButton from "./ContactButton";

function ContactSection() {
    return (
        <div className="contact fade-in">
            <div className="contact__inner tk-lato">
                <h2>Get in touch</h2>
                <svg viewBox="0 0 32 32">
                    <path fill="#85C8B6" d="M9.67 14.42a1.58 1.58 0 1 0 0 3.16 1.58 1.58 0 0 0 0-3.16Zm6.33 0a1.58 1.58 0 1 0 0 3.16 1.58 1.58 0 0 0 0-3.16Zm6.33 0a1.58 1.58 0 1 0 0 3.16 1.58 1.58 0 0 0 0-3.16ZM16 .17A15.83 15.83 0 0 0 3.75 26.02L.58 29.2a1.58 1.58 0 0 0-.33 1.72 1.58 1.58 0 0 0 1.5.92H16A15.83 15.83 0 0 0 16 .17Zm0 28.5H5.57l1.47-1.48a1.58 1.58 0 0 0 .47-1.12c0-.42-.17-.82-.47-1.1a12.67 12.67 0 1 1 8.96 3.7Z"/>
                </svg>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eleifend tortor tempus auctor. Donec varius, velit eu <a href="#">hendrerit volutpat</a>, odio augue sollicitudin dolor, sed efficitur odio diam <a href="#">vitae ante</a>. Ut sit amet cursus neque hendrerit volutpat.</p>
                <ContactButton />
            </div>
        </div>
    );
}

export default ContactSection;
