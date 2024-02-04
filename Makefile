.PHONY: dev

dev:
	make prerequisites
	make install-dependencies
	pnpm run dev

prerequisites:
	@echo "Checking prerequisites"
	@node -v || (echo "node failed $$?"; exit 1)
	@pnpm -v || (echo "pnpm failed $$?"; exit 1)

install-dependencies:
	@echo "Installing dependencies"
	pnpm install

