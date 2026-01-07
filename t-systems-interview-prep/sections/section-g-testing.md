# Section G: Testing (Ultra Deep Dive)

## Q1: The Testing Philosophy: Jest + React Testing Library (RTL). Why do we avoid testing 'Implementation Details' and how do we test 'User Behavior' in a senior-led project?

**Senior-level Answer:**
"For a senior, testing isn't just about 'Code Coverage'; it's about **Refactor Resilience**. 

In the old days of Enzyne, we used to test **Implementation Details**. We would check if `wrapper.state().isOpen` was true. The problem? If I refactored that component from a Class to a Hook, or renamed that state variable to `isExpanded`, my test would fail, even if the UI still worked perfectly. This makes the test suite a 'Ball and Chain' that slows down the team.

**React Testing Library (RTL)** changed the philosophy to: **'Test your software the way users use it.'** 
A user doesn't care about your component's internal state. A user cares if, when they click a button labeled 'Submit', a success message appears.

My testing hierarchy is:
1. **Queries over Classes:** I use `getByRole`, `getByText`, and `getByLabelText`. These are 'Accessible' queries. If my test can't find a button by its role, it means an automated screen reader can't find it either. Tests become an Accessibility audit.
2. **User Events over FireEvents:** I use `@testing-library/user-event` instead of `fireEvent`. `user-event` more accurately simulates the chain of browser events (hover, focus, keydown, keypress, keyup) that happen when a user types.
3. **Asynchronous 'Waiting':** I use `findBy...` queries (which return a Promise) to handle the inherently asynchronous nature of modern React apps.

By focusing on behavior, my tests become **Documentation**. Anyone can read the test and understand the feature's requirements without looking at the code."

**Real-world Production Scenario:**
In a T-Systems finance project, we had a 'Multi-Step Credit Application'. Initially, the junior devs wrote tests like: `expect(component.instance().currentStep).toBe(2)`. 

When we migrated the app to the **Next.js App Router** and converted those components to Functional Components, every single one of those tests broke. We spent 2 weeks just 'Fixing Tests' that were fundamentally useless.

I led a refactor to an **RTL behavioral suite**:
```javascript
// The 'Senior' approach
const nextButton = screen.getByRole('button', { name: /continue to step 2/i });
await userEvent.click(nextButton);
expect(await screen.findByText(/enter your income/i)).toBeInTheDocument();
```
Now, the team can change the state management, rename variables, or even swap the underlying UI library, and as long as the user still sees the Income field after clicking Continue, the tests stay green. This 'Refactor Resilience' saved us hundreds of man-hours during our subsequent UI rebrand."

**Follow-up Questions Interviewers Ask:**
1. **"What is the 'Query Priority' in RTL?"**
   - *Answer:* Priority 1 is `getByRole`. Priority 2 is `getByLabelText`. Priority 3 is `getByPlaceholderText`. Only use `data-testid` as a last resort for elements that have no semantic meaning.
2. **"How do you handle 'Act' warnings?"**
   - *Answer:* An `act(...)` warning usually means something 'happened' in your component (like an async update) after your test was 'finished' with its assertions. To fix it, you usually need to `await` the async result using a `findBy` query.
3. **"Should you mock components in Unit Tests?"**
   - *Answer:* Mock as little as possible. If you mock the child components, you aren't testing the integration. I only mock heavy, side-effectful components like `Google Maps` or `ChartJS`.

---

## Q2: Testing Async Flows and Redux. How do you test a component that depends on global state and API responses?

**Senior-level Answer:**
"Testing a Redux-connected component is about **Isolating the Store, not Moking it.**

I avoid mocking the `useSelector` or `useDispatch` hooks. If you mock the hooks, you aren't testing if your component actually works with Redux. 

The 'Senior' pattern is to create a **Render Utility** that wraps your component in a real `<Provider>` with a fresh store instance for every test. This ensures 'Test Isolation' (state from Test A doesn't leak into Test B) while maintaining 'Realism'.

For API responses, I strictly follow the **MSW (Mock Service Worker)** pattern. 
- **The Old Way:** Mocking `global.fetch` or `axios.get`. This is fragile because it mocks the *implementation* of the fetch call. If you switch from Axios to Fetch, your tests break.
- **The MSW Way:** MSW intercepts the actual network layer in the browser (via Service Workers) or Node.js. You define 'Handlers' that look like a real Express server. 
  - If your component calls `GET /api/user`, MSW returns a real-looking JSON response. 
  - Your component doesn't know it's being tested. This is the ultimate 'Black Box' test."

**Real-world Production Scenario:**
In a hospitality dashboard, we had a 'Table' component that fetched 5 different 'Status' counts from an API and calculated a 'Health' percentage stored in Redux. 

We used **MSW + Custom Render**:
1. We set up an MSW handler for `/api/status` that returned `{ dirty: 5, clean: 20 }`.
2. Our test simply rendered the Table and checked `expect(await screen.findByText('80%')).toBeInTheDocument()`.
3. Because we didn't mock Redux, we were testing:
   - The Hook that calls the API.
   - The Reducer logic that processes the data.
   - The Selector logic that calculates the 80%.
   - The Component that renders it.

One day, a developer accidentally changed the calculation from `clean/total` to `dirty/total`. Because our test was a 'Vertical Slice' of the feature (API → Redux → UI), it caught the bug instantly. A traditional unit test that mocked Redux would have stayed green and the bug would have hit production."

**Follow-up Questions Interviewers Ask:**
1. **"What are the benefits of MSW over Jest Mocks?"**
   - *Answer:* MSW works in the browser too (perfect for development and Storybook). It's also 'Library Agnostic'—it captures any network request (Fetch, Axios, GraphQL).
2. **"How do you reset the MSW handlers between tests?"**
   - *Answer:* Using `server.resetHandlers()`. This allows you to define a 'Success' case for one test and then 'Override' it with a '403 Forbidden' response for an error-case test.
3. **"Should you use `waitFor` to check for non-existence?"**
   - *Answer:* No. Use `waitForElementToBeRemoved`. It's more efficient than doing repeated `expect(queryByText).not.toBeInDocument()` calls.

---

## Q3: Testing Custom Hooks. When should you test a hook in isolation vs through a component?

**Senior-level Answer:**
"My rule of thumb is: **If the hook has complex, reusable logic that spans multiple components, test it in isolation. If it's a simple state-wrapper for one component, test it through that component.**

For isolation testing, we use `@testing-library/react-hooks` (now part of the main RTL package). The key is the `renderHook` utility. 

Testing a hook is tricky because hooks cannot exist outside of a React component. `renderHook` acts as a 'Dummy' component for you. 

The three things a senior looks for in hook tests are:
1. **Initial State:** Does it start with the correct defaults?
2. **Actions:** When you call a returned function (e.g., `increment`), does the state update? (Must be wrapped in the `act()` utility).
3. **Async Side-Effects:** If the hook fetches data on mount, does it handle the 'Loading' and 'Success' states correctly?

**The 'Senior' Trap:** Watch out for hooks that return objects. If your hook returns `{ value, setValue }` and you don't use `useMemo`/`useCallback` inside, your component will re-render unnecessarily on every change. I write tests to verify **Referential Equality** of the hook's return values."

**Real-world Production Scenario:**
We built a custom `useInfiniteScroll` hook for an automotive configuration app. It was used on 5 different pages. 

We tested it in isolation using `renderHook`:
- We mocked the `IntersectionObserver` using a polyfill.
- We verified that when the 'Observer' triggered, the hook's `isIntersecting` state changed.
- We verified that it correctly 'thrashed' (cleaned up) the observer on unmount.

By testing it once in isolation, we were 100% confident that all 5 pages using it were bug-free for the 'Scroll' logic. We then only wrote 'Behavioral' tests for the pages to ensure the *data* loaded correctly when the scroll reached the bottom."

**Follow-up Questions Interviewers Ask:**
1. **"How do you test a hook that uses a Context Provider?"**
   - *Answer:* Use the `wrapper` option in `renderHook`. You pass a component that wraps the hook in the necessary Provider.
2. **"What is the difference between `result.current` and just `result` in a hook test?"**
   - *Answer:* `result.current` is a 'Live' pointer to the hook's return value. Because the hook re-renders, `result.current` always holds the latest state.

---

## Q4: Integration vs End-to-End (E2E) Testing. Explain the ROI of Playwright/Cypress vs Jest and the 'Testing Trophy' vs 'Testing Pyramid'.

**Senior-level Answer:**
"In an enterprise app with a complex CI/CD pipeline, the **'Testing Trophy'** is the superior model over the old 'Pyramid'. 

- **The Pyramid** suggested 70% Unit Tests (tiny, cheap).
- **The Trophy** (popularized by Kent C. Dodds) suggests the bulk of your effort should be in **Integration Tests**. 

Why? Because Unit tests are too small to catch bugs in how components talk to each other. E2E tests are too 'Flaky' and slow to catch every edge case. Integration tests (via RTL + MSW) are the 'Sweet Spot' of high confidence and high speed.

However, a senior knows that **E2E (Playwright/Cypress)** is the only way to test the 'Critical Path' (Login, Checkout, Payment). 

My E2E strategy is **'The Happy Path Only'**:
1. **Playwright:** I prefer it over Cypress for enterprise because it supports multiple tabs, multiple browser contexts, and is significantly faster (runs in parallel by default).
2. **Persistence:** Don't test 'Login' in every single E2E test. Use Playwright's `storageState` to log in once, save the cookies, and reuse them for 50 other tests. 
3. **Real Backend:** E2E should hit a 'Staging' or 'UAT' environment with a real database. This is the only way to catch 'Network Infrastructure' or 'Schema Mismatch' bugs that Jest will never see."

**Real-world Production Scenario:**
We had a bug where the 'Magenta' branding on the T-Systems portal was being overwritten by a legacy CSS file only in the Production environment due to a CDN caching issue. 

- **Jest/RTL:** Failed to catch it (they don't render CSS).
- **Manual QA:** Caught it, but it was embarrassing to reach Production.

I implemented a **Visual Regression Test** using Playwright. Every time we pushed a change to the 'Design System', Playwright would:
1. Open the dev environment and the production environment.
2. Take a screenshot of the main components.
3. Compare them pixel-by-pixel. 
4. If there was a >0.1% difference, it would fail the build and show us a 'Diff' image. 
This 'Senior' move protected the brand identity automatedly, freeing up the QA team to focus on complex business logic instead of checking button colors."

**Common Mistakes Candidates Make:**
- **The 'Sleep' anti-pattern:** Using `await page.waitForTimeout(3000)`. This is the #1 cause of flaky E2E tests. Always use 'Wait for Selector' or 'Wait for Network Idle'.
- **Testing too much in E2E:** Trying to test 'Invalid Email Format' in Playwright. That should be a Unit test. E2E is for the 'Full Journey'.
- **Ignoring the CI/CD cost:** Not realizing that running 100 E2E tests on every commit will cost the company a lot in GitHub Actions/Vercel minutes and slow down the whole team.
