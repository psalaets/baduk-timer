{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
    nix-plop.url = "gitlab:cbleslie/nix-plop";
    # Non-flake
    editorconfig.url = "github:Ookiiboy/editor-config/";
    editorconfig.flake = false;
  };

  outputs = {
    self,
    systems,
    nixpkgs,
    pre-commit-hooks,
    nix-plop,
    editorconfig,
    ...
  }: let
    forAllSystems = nixpkgs.lib.genAttrs (import systems);
  in {
    formatter = forAllSystems (system: let
      pkgs = import nixpkgs {inherit system;};
    in
      pkgs.alejandra);
    # https://github.com/cachix/git-hooks.nix?tab=readme-ov-file
    # https://devenv.sh/reference/options/?query=pre-commit.hooks
    checks = forAllSystems (system: {
      pre-commit-check = pre-commit-hooks.lib.${system}.run {
        src = ./.;
        hooks = {
          # Nix
          alejandra.enable = true;
          deadnix.enable = true;
          statix.enable = true;
          flake-checker.enable = true;
          # JS
          eslint.enable = true;
          prettier.enable = true;
          # JSON
          check-json.enable = true;
          # Markdown
          # typos plugin is flagging some i18n words
          # typos.enable = true;
          # Generic
          editorconfig-checker.enable = true;
          # Tests
          # https://github.com/cachix/git-hooks.nix?tab=readme-ov-file#custom-hooks
          unit-tests = {
            enable = true;
            name = "Unit Tests";
            entry = "npm run test-check";
            pass_filenames = false;
          };
        };
      };
    });
    devShells = forAllSystems (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      default = pkgs.mkShell {
        shellHook = ''
          ln -sf ${editorconfig}/.editorconfig ./.editorconfig
          ${self.checks.${system}.pre-commit-check.shellHook}
        '';
        buildInputs = with pkgs;
          [
            nix-plop.packages.${system}.default
            nodejs_20
            ffmpeg
          ]
          ++ self.checks.${system}.pre-commit-check.enabledPackages;
      };
    });
  };
}
