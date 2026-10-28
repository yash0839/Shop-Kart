import { useState } from "react";
import {
  RiArrowRightLine,
  RiFacebookFill,
  RiInstagramLine,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiTwitterXFill,
  RiWhatsappLine,
  RiYoutubeFill,
} from "@remixicon/react";

const helpCategories = [
  "Order Issue",
  "Return / Refund",
  "Payment Help",
  "Account Support",
  "Product Inquiry",
  "Other",
];

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/", Icon: RiFacebookFill },
  { name: "X", url: "https://x.com/", Icon: RiTwitterXFill },
  { name: "YouTube", url: "https://www.youtube.com/", Icon: RiYoutubeFill },
  { name: "Instagram", url: "https://www.instagram.com/", Icon: RiInstagramLine },
];

const createEmptyForm = () => ({
  name: "",
  email: "",
  subject: "",
  orderId: "",
  message: "",
  helpOptions: [],
});

const Contact = () => {
  const [formData, setFormData] = useState(createEmptyForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
    setSubmitted(false);
  };

  const handleHelpChange = (event) => {
    const { checked, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      helpOptions: checked
        ? [...previous.helpOptions, value]
        : previous.helpOptions.filter((option) => option !== value),
    }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Contact Form Data:", formData);
    setFormData(createEmptyForm());
    setSubmitted(true);
  };

  return (
    <main className="bg-light py-5">
      <div className="container">
        <header className="text-center mb-5">
          <p className="text-danger text-uppercase fw-semibold small mb-2">
            Shop-Kart customer care
          </p>
          <h1 className="display-5 fw-bold text-dark mb-3">Contact Us</h1>
          <p className="text-secondary mx-auto mb-0" style={{ maxWidth: "42rem" }}>
            Questions about an order or need a hand? Our team is here to make
            your shopping experience a little easier.
          </p>
        </header>

        <div className="row g-4 g-xl-5 align-items-start">
          <section className="col-12 col-lg-5" aria-label="Contact information">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">We&apos;re happy to help</h2>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <span className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-3 bg-danger-subtle text-danger p-3">
                    <RiWhatsappLine size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Chat with us on WhatsApp</h3>
                    <p className="text-secondary small mb-2">
                      Message our support team for a quick response.
                    </p>
                    <a
                      className="link-danger fw-semibold text-decoration-none"
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start a chat <RiArrowRightLine aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <span className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-3 bg-danger-subtle text-danger p-3">
                    <RiMailLine size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Email support</h3>
                    <p className="text-secondary small mb-2">
                      Send us the details and we&apos;ll get back to you.
                    </p>
                    <a
                      className="link-danger fw-semibold text-decoration-none"
                      href="mailto:support@shopkart.com"
                    >
                      support@shopkart.com
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <span className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-3 bg-danger-subtle text-danger p-3">
                    <RiPhoneLine size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Call us</h3>
                    <p className="text-secondary small mb-2">
                      Monday–Saturday, 9 AM–6 PM.
                    </p>
                    <a
                      className="link-danger fw-semibold text-decoration-none"
                      href="tel:+919876543210"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <span className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-3 bg-danger-subtle text-danger p-3">
                    <RiMapPinLine size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Visit our office</h3>
                    <address className="text-secondary small mb-0">
                      123 Shopping Street,
                      <br />
                      Bangalore, Karnataka 560001
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
              <iframe
                src="https://www.google.com/maps?q=I.T.VEDANT&output=embed"
                title="Map showing the I.T. Vedant office location"
                loading="lazy"
                className="w-100 border-0"
                style={{ height: "280px" }}
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <h2 className="h6 fw-bold mb-1">Follow Shop-Kart</h2>
                  <p className="text-secondary small mb-0">
                    News, offers, and a little inspiration.
                  </p>
                </div>
                <nav className="d-flex gap-2" aria-label="Social media">
                  {socialLinks.map(({ name, url, Icon }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Shop-Kart on ${name}`}
                      className="d-flex align-items-center justify-content-center rounded-circle bg-danger-subtle text-danger p-2"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </section>

          <section className="col-12 col-lg-7" aria-label="Send us a message">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <h2 className="h3 fw-bold mb-2">Send us a message</h2>
                <p className="text-secondary mb-4">
                  Fill in the form and tell us how we can help.
                </p>

                {submitted && (
                  <div className="alert alert-success" role="status">
                    <strong>Thank you!</strong> Your message has been recorded
                    in this demo. No email was sent; connect a backend or email
                    service to deliver messages to the support team.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="contact-name" className="form-label fw-semibold">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        id="contact-name"
                        className="form-control form-control-lg"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="contact-email" className="form-label fw-semibold">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        id="contact-email"
                        className="form-control form-control-lg"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="contact-subject" className="form-label fw-semibold">
                        Subject <span className="text-danger">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        className="form-control form-control-lg"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What can we help with?"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="contact-order-id" className="form-label fw-semibold">
                        Order ID <span className="text-secondary fw-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-order-id"
                        className="form-control form-control-lg"
                        type="text"
                        name="orderId"
                        value={formData.orderId}
                        onChange={handleChange}
                        placeholder="For example, SK-123456"
                      />
                    </div>

                    <fieldset className="col-12">
                      <legend className="form-label fw-semibold mb-1">
                        How can we help?
                      </legend>
                      <p className="text-secondary small mb-3">Select all that apply.</p>
                      <div className="row g-2">
                        {helpCategories.map((category) => {
                          const id = `help-${category
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-|-$/g, "")}`;

                          return (
                            <div className="col-12 col-sm-6" key={category}>
                              <div className="form-check border rounded-3 p-3 ps-5 h-100">
                                <input
                                  id={id}
                                  className="form-check-input"
                                  type="checkbox"
                                  name="helpOptions"
                                  value={category}
                                  checked={formData.helpOptions.includes(category)}
                                  onChange={handleHelpChange}
                                />
                                <label className="form-check-label" htmlFor={id}>
                                  {category}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="col-12">
                      <label htmlFor="contact-message" className="form-label fw-semibold">
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        className="form-control"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share a few details so we can help."
                        maxLength={500}
                        rows={5}
                        required
                      />
                      <div className="d-flex justify-content-end mt-1">
                        <small className="text-secondary" aria-live="polite">
                          {formData.message.length}/500 characters
                        </small>
                      </div>
                    </div>

                    <div className="col-12 pt-2">
                      <button className="btn btn-danger btn-lg w-100 fw-semibold" type="submit">
                        Send Message <RiArrowRightLine className="ms-1" aria-hidden="true" />
                      </button>
                      <p className="text-secondary small text-center mt-3 mb-0">
                        This form is a front-end demo and does not send email.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>

        <section className="card border-0 shadow-sm rounded-4 mt-5 text-center">
          <div className="card-body p-4 p-md-5">
            <h2 className="h3 fw-bold">Need more help?</h2>
            <p className="text-secondary mb-4">
              Our support team is ready to help with your shopping experience.
            </p>
            <a
              className="btn btn-danger px-4 py-2 fw-semibold"
              href="mailto:support@shopkart.com"
            >
              <RiMailLine className="me-2" aria-hidden="true" />
              Email Us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
