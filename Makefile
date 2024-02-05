.PHONY: setup

setup:
	make prerequisites
	make install-dependencies
	make prepare-file
	@echo "Ready to go! 🎉"

prerequisites:
	@echo "Checking prerequisites"
	@node -v || (echo "node failed $$?"; exit 1)
	@pnpm -v || (echo "pnpm failed $$?"; exit 1)

install-dependencies:
	@echo "Installing dependencies"
	pnpm install

prepare-file:
	@echo "Preparing file"
	@cp .env.sample ./.env

