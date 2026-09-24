# Team Chat UI Design Skill

## Purpose

Improve the UI/UX of the existing Team Chat application using React and Tailwind CSS.

The existing application already has a working design, component structure, routing, state management, API integration, SignalR, and authentication.

Your job is to **refine and improve the existing interface**, not redesign the application's architecture.

---

## 1. Preserve the Existing Project

Before making changes:

* Inspect the existing file structure.
* Inspect the existing components.
* Inspect the existing Tailwind classes/styles.
* Inspect the current layout.
* Understand how components communicate.
* Understand existing routing and state management.

Do NOT reorganize the project unless explicitly requested.

Do NOT rename or move files unnecessarily.

Do NOT introduce a new architecture.

Do NOT replace existing libraries when they already solve the problem.

---

## 2. Preserve Functionality

UI changes must not break:

* Authentication
* Cookie-based authentication
* SignalR
* Conversations
* Messages
* API requests
* React Context
* Existing hooks
* Routing
* User selection
* Message sending
* Message receiving
* Conversation persistence

Do not modify backend code for a UI task.

Do not change API endpoints.

Do not change SignalR behavior.

If a UI improvement appears to require a functional change, explain why before changing it.

---

## 3. Improve, Don't Replace

The existing design is the starting point.

When improving a component:

### First

Understand what already exists.

### Then

Improve:

* spacing
* typography
* alignment
* hierarchy
* colors
* borders
* responsive behavior
* hover states
* focus states
* loading states
* empty states
* error states

### Avoid

Completely replacing the component unless the existing implementation genuinely prevents the requested improvement.

Prefer incremental changes.

---

## 4. Keep the Design Simple

The Team Chat UI should feel:

* clean
* modern
* professional
* lightweight
* easy to understand

Do not automatically add:

* gradients
* glassmorphism
* glowing effects
* huge shadows
* excessive rounded cards
* decorative blobs
* unnecessary animations
* excessive icons
* unnecessary colors

Simple does not mean unfinished.

Aim for **simple but polished**.

---

## 5. Respect the Existing Visual Style

If the existing application already has:

* a color palette
* border radius
* typography
* spacing
* button styles
* component styles

continue using them.

Do not introduce a completely different visual language.

If something needs improvement, make the smallest change necessary to make it better.

---

## 6. Component Reuse

Before creating a new component:

1. Check whether an existing component can be reused.
2. Check whether an existing component can be extended.
3. Only create a new component when it provides a clear benefit.

Do not create duplicate components with slightly different names.

---

## 7. Tailwind

Use the Tailwind conventions already used by the project.

Prefer readable utility classes.

Example:

```jsx
<div className="flex items-center gap-3 rounded-lg border p-4">
```

Avoid unnecessarily enormous class strings when a reusable component would be clearer.

Do not introduce custom CSS when Tailwind can reasonably handle the design.

However, use existing CSS when the project already relies on it.

---

## 8. Responsive Design

Improve the existing UI for:

* mobile
* tablet
* desktop

Do not redesign the desktop interface simply to make it responsive.

Use Tailwind responsive utilities where appropriate:

```text
sm:
md:
lg:
xl:
```

Pay particular attention to:

* conversation sidebar
* chat area
* message composer
* navigation
* long usernames
* long messages

---

## 9. Chat UX

Prioritize the actual chat experience.

Users should easily understand:

* who they are talking to
* which conversation is selected
* who sent each message
* when messages were sent
* where to type
* how to send a message
* whether the application is connected

Keep the message area visually calm.

Messages are the primary content.

---

## 10. Conversation List

Improve readability of conversation items.

Consider:

* avatar
* username
* latest message
* timestamp
* active state
* hover state
* unread state if supported

Do not invent functionality that does not exist.

If unread messages are not implemented, do not create fake unread counts.

---

## 11. Message UI

Messages should be:

* easy to read
* visually separated
* properly aligned
* responsive

Long messages must not break the layout.

Use appropriate utilities such as:

```text
break-words
overflow-hidden
max-w
truncate
```

when appropriate.

Do not make chat bubbles unnecessarily large.

---

## 12. Message Composer

The message composer should be visually obvious without dominating the screen.

Ensure:

* input is easy to find
* send action is clear
* disabled state is visible
* focus state is clear
* mobile layout works

Preserve the existing sending behavior.

---

## 13. Loading / Empty / Error States

Do not treat all three as the same state.

### Loading

Show an appropriate loading indicator or skeleton.

### Empty

Explain what the user can do.

Example:

```text
No messages yet
Send a message to start the conversation.
```

### Error

Explain what happened and provide an action when possible.

Example:

```text
Unable to load messages.
Try again.
```

Do not expose raw backend errors in the UI.

---

## 14. Accessibility

Use semantic HTML.

Interactive elements should be keyboard accessible.

Icon-only buttons should have:

```jsx
aria-label="..."
```

Maintain visible focus states.

Do not rely only on color to communicate important information.

---

## 15. Icons

Use the existing icon library if the project already has one.

For example, if Lucide React is installed:

```jsx
import { Search, Send, Menu } from "lucide-react";
```

Do not install another icon library unnecessarily.

Do not use icons simply for decoration.

---

## 16. Animation

Use subtle animation only when it improves the experience.

Good examples:

```text
hover
focus
transition-colors
transition-opacity
```

Avoid excessive:

* bouncing
* scaling
* floating
* glowing
* sliding

The chat should feel responsive, not animated for the sake of animation.

---

## 17. Do Not Invent Data

Do not invent:

* users
* conversations
* messages
* profile information
* online status
* unread counts
* statistics

Use the application's existing data.

If mock data is explicitly requested, clearly separate it from real application data.

---

## 18. Do Not Overengineer

For a simple UI request:

Do not:

* create unnecessary abstractions
* create unnecessary hooks
* create unnecessary context
* install dependencies
* rewrite existing components
* reorganize folders
* rewrite CSS architecture

Make the smallest clean change that solves the problem.

---

## 19. Before Editing

Always follow this process:

```text
1. Inspect the relevant files.
2. Understand the existing implementation.
3. Identify the specific UI problem.
4. Make the smallest appropriate change.
5. Preserve existing functionality.
6. Check responsive behavior.
7. Check for visual consistency.
8. Check for obvious accessibility issues.
```

---

## 20. Final Rule

The existing application is the source of truth.

Do not assume that a different architecture or completely different design is better.

**Improve what exists.**

The goal is:

> Simple → Clean → Consistent → Responsive → Polished

Not:

> Simple → Completely redesigned → Overengineered
