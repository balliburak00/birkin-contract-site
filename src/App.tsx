import { useMemo, useState } from "react"
import "./index.css"

function BirkinLogo() {
  return (
    <svg
      className="siteLogo"
      viewBox="0 0 520 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Birkin Contract Logo"
    >
      <text
        x="0"
        y="52"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="40"
        fontWeight="800"
        fill="#E682D2"
        letterSpacing="2"
      >
        BIRKIN CONTRACT
      </text>

      <text
        x="125"
        y="88"
        fontFamily="Brush Script MT, Segoe Script, cursive"
        fontSize="34"
        fill="#7A22FF"
      >
        Crafted for Spaces
      </text>
    </svg>
  )
}

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    projectType: "",
    productGroup: "",
    quantity: "",
    deliveryDate: "",
    deliveryLocation: "",
    message: "",
  })

  const mailLink = useMemo(() => {
    const subject = encodeURIComponent("Project Inquiry - Birkin Contract")

    const body = encodeURIComponent(
      `Name / Company: ${form.name}
Email: ${form.email}
Phone / WhatsApp: ${form.phone}
Country / City: ${form.country}

Project Type: ${form.projectType}
Product Group: ${form.productGroup}
Estimated Quantity: ${form.quantity}
Target Delivery Date: ${form.deliveryDate}
Delivery Location: ${form.deliveryLocation}

Project Notes:
${form.message}`
    )

    return `mailto:burak@birkin.com?subject=${subject}&body=${body}`
  }, [form])

  return (
    <main>
      <header className="navbar">
        <div className="brand">
          <BirkinLogo />
        </div>

        <nav>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#products">Products</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="navBtn">
          Request a Quote
        </a>
      </header>

      <section className="hero">
        <div className="heroText">
          <span className="tag">Tailored Furniture Solutions</span>

          <h1>
            Custom-made contract furniture for hospitality and commercial
            projects.
          </h1>

          <p>
            Birkin Contract provides project-based furniture sourcing and
            custom-made production coordination for hotels, restaurants, cafés,
            villas and commercial interiors.
          </p>

          <div className="buttons">
            <a href="#contact" className="primaryBtn">
              Request a Quote
            </a>
            <a href="#products" className="secondaryBtn">
              Product Groups
            </a>
          </div>

          <div className="heroStats">
            <div>
              <strong>Hotels</strong>
              <span>Rooms, lobby, restaurant & outdoor areas</span>
            </div>
            <div>
              <strong>Restaurants</strong>
              <span>Dining, bar, banquette & terrace furniture</span>
            </div>
            <div>
              <strong>Villas</strong>
              <span>Custom indoor & outdoor furniture pieces</span>
            </div>
          </div>
        </div>

        <div className="heroCard">
          <div className="premiumVisual">
            <div className="visualTop">
              <span>Project-Based Supply</span>
              <strong>Contract Furniture</strong>
            </div>

            <div className="visualCenter">
              <div className="chairShape"></div>
              <div className="tableShape"></div>
              <div className="sofaShape"></div>
            </div>

            <div className="visualBottom">
              <div>
                <strong>01</strong>
                <span>Brief</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Quotation</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Production</span>
              </div>
            </div>
          </div>

          <h3>Hospitality & Commercial Projects</h3>

          <p>
            Tables, chairs, bar stools, lounge seating, outdoor furniture,
            banquette seating and custom-made furniture solutions.
          </p>

          <ul>
            <li>Custom measurements</li>
            <li>Material and finish alternatives</li>
            <li>Production coordination</li>
            <li>Domestic and international supply</li>
          </ul>
        </div>
      </section>

      <section id="about" className="section">
        <span className="smallTitle">About Birkin Contract</span>

        <h2>A project partner for contract furniture needs.</h2>

        <p>
          Birkin Contract is a project-based contract furniture partner
          providing custom-made furniture solutions for hospitality and
          commercial spaces. We support architects, interior designers,
          procurement teams and investors with furniture sourcing, production
          coordination and tailored manufacturing solutions.
        </p>
      </section>

      <section id="services" className="section darkSection">
        <span className="smallTitle">Services</span>

        <h2>Designed for project-based work.</h2>

        <div className="grid">
          <div className="card">
            <h3>Custom-Made Production</h3>
            <p>
              Furniture solutions according to project dimensions, materials,
              concept and budget.
            </p>
          </div>

          <div className="card">
            <h3>Contract Furniture Supply</h3>
            <p>
              Project-based supply for hotels, restaurants, cafés, villas and
              commercial interiors.
            </p>
          </div>

          <div className="card">
            <h3>Production Coordination</h3>
            <p>
              Supplier coordination, sample approval, quality control and
              delivery follow-up.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="section">
        <span className="smallTitle">Product Groups</span>

        <h2>Furniture categories for commercial projects.</h2>

        <div className="productGrid">
          <div>Dining Tables</div>
          <div>Chairs</div>
          <div>Bar Stools</div>
          <div>Outdoor Furniture</div>
          <div>Lounge Seating</div>
          <div>Banquette Seating</div>
          <div>Sunbeds</div>
          <div>Custom Pieces</div>
        </div>
      </section>

      <section id="process" className="section darkSection">
        <span className="smallTitle">Our Process</span>

        <h2>From brief to delivery.</h2>

        <div className="processGrid">
          <div>
            <strong>01</strong>
            <span>Project Brief</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Technical Review</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Material Selection</span>
          </div>

          <div>
            <strong>04</strong>
            <span>Quotation</span>
          </div>

          <div>
            <strong>05</strong>
            <span>Production</span>
          </div>

          <div>
            <strong>06</strong>
            <span>Delivery</span>
          </div>
        </div>
      </section>

      <section className="section seoBox">
        <span className="smallTitle">Contract Furniture from Türkiye</span>

        <h2>
          Custom furniture solutions for hotels, restaurants and commercial
          spaces.
        </h2>

        <p>
          Birkin Contract provides custom-made contract furniture solutions from
          Türkiye for hospitality and commercial projects. Our product groups
          include hotel furniture, restaurant furniture, café furniture, outdoor
          furniture, lounge seating, bar stools, dining tables and bespoke
          furniture pieces.
        </p>
      </section>

      <section id="contact" className="section contact">
        <div>
          <span className="smallTitle">Request a Quote</span>

          <h2>Tell us about your project.</h2>

          <p>
            Share your project details and we will prepare a project-based
            response. For accurate pricing, please include product groups,
            quantities, dimensions, material preferences and delivery location.
          </p>

          <div className="quoteChecklist">
            <div>✓ Project type</div>
            <div>✓ Product groups</div>
            <div>✓ Quantity & dimensions</div>
            <div>✓ Material preference</div>
            <div>✓ Delivery location</div>
          </div>

          <p className="contactInfo">Mail: burak@birkin.com</p>
          <p className="contactInfo">Phone / WhatsApp: +90 552 500 03 20</p>
          <p className="contactInfo">Location: Türkiye</p>
        </div>

        <form className="form">
          <div className="formRow">
            <input
              placeholder="Name / Company"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="formRow">
            <input
              placeholder="Phone / WhatsApp"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              placeholder="Country / City"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>

          <select
            value={form.projectType}
            onChange={(e) =>
              setForm({ ...form, projectType: e.target.value })
            }
          >
            <option value="" disabled>
              Project Type
            </option>
            <option>Hotel / Resort</option>
            <option>Restaurant / Cafe</option>
            <option>Villa / Residence</option>
            <option>Office / Commercial Space</option>
            <option>Outdoor / Terrace / Beach Club</option>
          </select>

          <select
            value={form.productGroup}
            onChange={(e) =>
              setForm({ ...form, productGroup: e.target.value })
            }
          >
            <option value="" disabled>
              Product Group
            </option>
            <option>Tables</option>
            <option>Chairs</option>
            <option>Bar Stools</option>
            <option>Lounge Seating</option>
            <option>Outdoor Furniture</option>
            <option>Banquette Seating</option>
            <option>Custom-Made Pieces</option>
          </select>

          <div className="formRow">
            <input
              placeholder="Estimated Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />

            <input
              placeholder="Target Delivery Date"
              value={form.deliveryDate}
              onChange={(e) =>
                setForm({ ...form, deliveryDate: e.target.value })
              }
            />
          </div>

          <input
            placeholder="Delivery Location"
            value={form.deliveryLocation}
            onChange={(e) =>
              setForm({ ...form, deliveryLocation: e.target.value })
            }
          />

          <textarea
            placeholder="Dimensions, materials, finishes, reference images or project notes"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>

          <a href={mailLink} className="primaryBtn">
            Send Project Inquiry
          </a>
        </form>
      </section>

      <footer className="footer">
        <div className="footerGrid">
          <div>
            <BirkinLogo />
            <p className="footerText">
              Birkin Contract provides custom-made contract furniture solutions
              for hospitality and commercial projects.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#products">Product Groups</a>
            <a href="#process">Process</a>
          </div>

          <div>
            <h4>Product Groups</h4>
            <span>Tables & Chairs</span>
            <span>Lounge Seating</span>
            <span>Outdoor Furniture</span>
            <span>Custom-Made Pieces</span>
          </div>

          <div>
            <h4>Contact</h4>
            <span>burak@birkin.com</span>
            <span>+90 552 500 03 20</span>
            <span>Türkiye</span>
          </div>
        </div>

        <div className="footerBottom">
          <span>© 2026 Birkin Contract. All rights reserved.</span>
          <span>Tailored Furniture Solutions</span>
        </div>
      </footer>

      <a
        href="https://wa.me/905525000320"
        className="whatsappBtn"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </main>
  )
}