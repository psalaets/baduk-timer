{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
    nix-plop.url = "gitlab:cbleslie/nix-plop";
  };

  outputs = {
    self,
    systems,
    nixpkgs,
    pre-commit-hooks,
    nix-plop,
    ...
  }: let
    forAllSystems = nixpkgs.lib.genAttrs (import systems);
  in {
    formatter = forAllSystems (system: nixpkgs.legacyPackages.${system}.alejandra);
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
          typos.enable = true;
          # Generic
          editorconfig-checker.enable = true;
        };
      };
    });
    devShells = forAllSystems (system: {
      default = nixpkgs.legacyPackages.${system}.mkShell {
        shellHook = ''${self.checks.${system}.pre-commit-check.shellHook}'';
        buildInputs = with nixpkgs.legacyPackages.${system};
          [
            nix-plop.packages.${system}.default
            nodejs_20
            ffmpeg_5
          ]
          ++ self.checks.${system}.pre-commit-check.enabledPackages;
      };
    });
  };
}
