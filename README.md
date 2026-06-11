# Testing Documentation Portofolio

## 📋 Overview

This portfolio documents comprehensive Quality Assurance testing conducted on **PharmaTrack**, a modern pharmacy e-commerce platform.

### About PharmaTrack

PharmaTrack is a modern, hybrid e-commerce and Mini Point of Sale (POS) application designed specifically for digital pharmacies. It bridges the gap between online shopping and physical pharmacy operations, providing automated inventory alerts, AI-powered health consultations, and streamlined sales tracking.


---

## 🎯 Testing Scope

### In Scope
- **Customer-facing features** only (product catalog, shopping cart, checkout, order history, AI chatbot)
- **Manual functional testing** (black-box methodology)
- **API endpoint testing** (critical customer-facing endpoints)
- **Performance testing** (load and stress scenarios)
- **Test environment:** Production environment (hosted on vercel)

### Out of Scope
- Admin and pharmacist management features
- Database performance optimization analysis
- UI/visual regression testing

---

## 🛠️ Technology Stack (QA Testing Tools)

| Category | Tools | Version |
|----------|-------|---------|
| **Manual Testing** | Manual black-box testing | N/A |
| **API Testing** | Postman | 12.13.5 |
| **Performance Testing** | Apache JMeter | 5.6.3 |
| **Automation Testing** | Cypress  | 15.13.1 |
| **Test Documentation** | Google Sheets, Excel | N/A |
| **Test Environment** | MacBook 2015, macOS Monterey 12.7, Chrome 148.0.7778.168 | - |

---

## 📊 Testing Methodology

### Black-Box Testing Approach
- Tests are designed from **user perspective** without access to source code
- Focus on **inputs and outputs** rather than internal implementation
- Test cases cover **positive (happy path), negative (error handling), and edge cases**

### Test Case Types
- **Positive Tests:** Verify correct system behavior with valid inputs
- **Negative Tests:** Verify error handling with invalid/malicious inputs
- **Edge Case Tests:** Test boundary conditions and extreme scenarios

---


## 📝 1. Manual Testing
This phase focuses on human-centric interactions to test different types of test cases in frontend logic and state management. It ensures the application handles expected and unexpected user behaviors.

### Test Plan
**Document:** [Test Plan](https://drive.google.com/file/d/1wfr6I3_UKnUc3U_Aj_SKT90eK5n9UZaF/view?usp=sharing)
- Testing approach and methodology
- Test scope (in-scope & out-of-scope)
- Test objectives and strategy
- 7 functional modules covered

### Test Cases
**Document:** [Test Cases](https://docs.google.com/spreadsheets/d/1PDGFbpEKLY63dTYqOkfTcKO1n7aS-Hy6/edit?usp=sharing&ouid=101715043327123919613&rtpof=true&sd=true)
- 74 total test cases (42 positive, 23 negative, 9 edge case)
- Organized by module (M01-M07)
- Includes: Test ID, Scenario, Precondition, Steps, Expected Result
- Ready for test execution with Actual Result & Status columns

### Test Execution Summary
**Document:** [Test Execution Summary](https://drive.google.com/file/d/1g1tmdp36OaoVmQofHuhB8jjM07tAOtVM/view?usp=sharing)
- **Result:** 97.3% pass rate (72 PASS, 2 FAIL)
- Per-module breakdown with statistics
- Visual charts (Severity, Test Type distribution)
- Findings & recommendations for failed tests
- UI/UX improvement suggestions 

### Test Modules Covered
1. **M01 - Authentication** (Register, Login, Logout, Profile)
2. **M02 - Product Catalog & Search** (Browse, Filter, Search)
3. **M03 - Product Details** (Product page, Stock status)
4. **M04 - Shopping Cart** (Add/Remove items, Quantity management)
5. **M05 - Checkout Process** (Order creation, Payment selection)
6. **M06 - Order History** (Track orders, View history)
7. **M07 - AI Chatbot** (Health queries, Product recommendations)

---

## 🤖 2. Automation Testing
Cypress was used for its native architectural fit with modern JavaScript frameworks like Next.js. Operating directly within the browser, this ensures fast and highly reliable End-to-End (E2E) validations from a user's perspective.

### Automation Test Report
**Document:** [Automation Test Report](https://drive.google.com/file/d/1alQgELDmOcISWWyEqStczBCCvc3KXUsw/view?usp=sharing)
- **Result:** 100% pass rate (47/47 test cases passed)
- End-to-end (E2E) testing using Cypress framework
- Total execution time: 8 minutes 55 seconds
- Test modules: Authentication, Product Catalog, Cart, Checkout, Order History, Profile, Contact Form, Homepage
- Screenshot evidence from Mochawesome reports for each test module

### Automation Test Coverage

| Module | Test Scenarios | Test Cases | Status |
|--------|---|---|---|
| Authentication Flow | Login, Register, Validation, Session | 5 |  Passed |
| Product Catalog & Search | Listing, Filter, Search, Details | 6 |  Passed |
| Cart Management | Add, Update, Remove, Total Calculation | 5 |  Passed |
| Checkout Flow | Flow, Validation, Confirmation | 7 |  Passed |
| Order History | View, Track, Filter, Reorder | 4 |  Passed |
| Profile Page | View, Edit, Update Info | 9 |  Passed |
| Contact Page | Submission, Validation | 6 |  Passed |
| Home Page | Hero section, Title, CTA Button | 4 |  Passed |
| **TOTAL** | | **47** |  **ALL PASSED** |

### Automation Testing Methodology
- **Framework:** Cypress (E2E testing)
- **Reporting:** Mochawesome with video recording
- **Test Environment:** Desktop (1280x720 viewport), Chromium browser
- **Test Data:** Dynamic configuration via cypress.config.js
- **Test Type:** Happy path (successful workflows) + Negative path (error handling)

### Key Testing Achievements
-  100% pass rate across all 8 modules
-  No critical functional bugs found
-  Comprehensive workflow testing (login → browse → cart → checkout → order confirmation)
-  Form validation and error handling tested
-  Session management and authentication verified
-  Fast execution: ~10 seconds per test case

### Test Flakiness Resolution
During initial test runs, identified and resolved:
- Client-side rendering delays (Next.js hydration): Fixed by using client-side navigation (cy.click) instead of page reloads
- Responsive element selection issues: Implemented :visible filter for CSS-hidden elements
- Session reset between tests: Consolidated assertions into single test flows

---

## 🔌 3. API Testing
API testing isolates the backend to validate the application's invisible architecture> With Postman, this approach focuses on dynamic environment management, sequential request chaining, and strict JSON schema assertions.

### API Test Report
**Document:** [API Test Execution Report](https://drive.google.com/file/d/1rTvqgnq7dLxkg3v0k1weDrZ52ItjTNqt/view?usp=sharing)
- **Result:** 100% pass rate (32/32 assertions passed, 0 failures)
- **Total Test Scenarios:** 16 requests with comprehensive assertion covexrage
- **Total Execution Time:** Average latency 1,861 ms
- **Test Environment:** Dynamic Postman environment with variable chaining
- Response schema verification, status code validation, error payload validation
- Dynamic environment variable extraction for sequential request chaining

### API Test Coverage

- Product Catalog & Categories Module (5 test scenarios)
- Order & Checkout Module (8 test scenarios)
- AI Health Assistant Module (3 test scenarios)


### Test Assertions Details
- **Total Assertions:** 32 (all passed)
- **Assertion Types:**
  - HTTP status code validation (200, 201, 400, 404)
  - JSON response schema structure verification
  - Required field presence and data type checking
  - Validation error message verification
  - Dynamic environment variable extraction and reuse
  - Emergency guardrail verification for AI responses
  - Order data integrity validation

---

## ⚡ 4. Performance Testing
Apache JMeter is utilized to simulate real-world traffic and proactively identify backend bottlenecks.
By mimicking concurrent user loads on critical endpoints (like catalog and checkout), this testing evaluates server resilience and database connection stability.
### Performance Test Report
**Document:** [Performance Test Report](https://drive.google.com/file/d/1_H1UBtvH6Ck52geJY-dV-gD7TfhdPTQ0/view?usp=sharing)
- Load test results (50 users, 10 minutes)
- Stress test results (50 users spike, 5 minutes)
- Per-endpoint performance breakdown
- Aggregate report with percentile analysis
- Critical findings and optimization recommendations

---

## 📜 License

This portfolio is provided for educational and portfolio purposes.
