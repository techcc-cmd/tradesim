# Contributing to TradeSim Pro

Thank you for considering contributing to TradeSim Pro! 🎉

## How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in Issues
2. Create a new issue with detailed description
3. Include steps to reproduce, expected vs actual behavior
4. Add screenshots if applicable

### Suggesting Features
1. Open an issue with [Feature Request] tag
2. Describe the feature and its benefits
3. Explain use cases and implementation ideas

### Code Contributions

#### Setup Development Environment
```bash
# Fork and clone repository
git clone https://github.com/yourusername/tradesim-pro.git
cd tradesim-pro

# Create feature branch
git checkout -b feature/your-feature-name
```

#### Coding Standards
- **Java**: Follow Spring Boot best practices
- **React**: Use functional components and hooks
- **Naming**: Use descriptive variable/function names
- **Comments**: Add comments for complex logic
- **Testing**: Write tests for new features

#### Commit Messages
```
feat: Add price alert notifications
fix: Resolve portfolio calculation bug
docs: Update API documentation
style: Format code with prettier
refactor: Optimize stock service
test: Add unit tests for order service
```

#### Pull Request Process
1. Update README.md with changes if needed
2. Ensure all tests pass
3. Update documentation
4. Create PR with clear description
5. Link related issues
6. Wait for review and address feedback

### Code Review
- Be respectful and constructive
- Focus on code quality and maintainability
- Suggest improvements, don't demand changes
- Approve when satisfied

## Development Guidelines

### Backend (Spring Boot)
- Use `@Service`, `@Repository`, `@Controller` annotations
- Implement proper exception handling
- Use DTOs for API responses
- Add `@Transactional` where needed
- Follow REST API conventions

### Frontend (React)
- Use functional components
- Implement proper error boundaries
- Use React hooks effectively
- Keep components small and focused
- Follow Tailwind CSS conventions

### Database
- Use migrations for schema changes
- Add proper indexes
- Use meaningful column names
- Document complex queries

## Questions?

Feel free to open an issue or reach out to maintainers!

Thank you for contributing! 🚀
