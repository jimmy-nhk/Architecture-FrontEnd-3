import React from "react";
import "./style.css";
import logo from "../../images/Showcase_Logo.png"

export default function Footer() {
  return (
    <footer class="footer">
      <div class="footer-container">
        <div class="row">
          <div class="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a href="../../AboutPage/about.html">about us</a>
              </li>
              <li>
                <a href="../../ServiceCategoryPage/serviceCategoryPage.html">
                  our categories
                </a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
              <li>
                <a href="#">terms and conditions</a>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>category</h4>
            <ul>
              <li>
                <a href="#">Engineering</a>
              </li>
              <li>
                <a href="#">Computer Science</a>
              </li>
              <li>
                <a href="#">Design</a>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Major</h4>
            <ul>
              <li>
                <a href="#">Robotics</a>
              </li>
              <li>
                <a href="#">Electrical</a>
              </li>
              <li>
                <a href="#">Psychology</a>
              </li>
              <li>
                <a href="#">Aviation</a>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <img className="footer-logo" src={logo} width="80%"   />
          </div>
        </div>
      </div>
    </footer>
  );
}
