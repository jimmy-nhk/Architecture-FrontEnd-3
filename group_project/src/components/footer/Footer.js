import React from "react";
import "./style.css";
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
        </div>
      </div>
    </footer>
  );
}
