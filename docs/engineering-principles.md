# Engineering Principles

These principles guide all development on TacticalMind AI to ensure quality, maintainability, and consistency.

## Build & Testing

- **Every sprint must leave the project compiling** - No broken commits
- **Add tests for core tactical logic** - Critical paths must be tested
- **No breaking changes to main** - main is always stable

## Code Quality

- **Components should be modular and reusable** - Avoid duplication
- **Prefer composition over duplication** - Share logic, don't copy it
- **Use conventional commit messages** - Follow the Conventional Commits spec
- **Document architecture decisions (ADRs) for major changes** - Record why, not just what

## Documentation

- **Every feature requires documentation** - Code changes must be accompanied by docs
- Keep docs in sync with code
- Use clear, plain language

## Development Workflow

- Work on feature branches
- Create pull requests for review
- Ensure all tests pass before merge
- Squash commits before merging to main
- Tag releases following semantic versioning

## Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Format with Prettier
- Aim for readable, self-documenting code

## Performance

- Profile before optimizing
- Canvas rendering must be efficient
- Minimize re-renders in React components
- Test on lower-end devices
