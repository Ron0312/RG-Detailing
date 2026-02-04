const heroImage = new Proxy({"src":"/_astro/hero-workshop.Degr1e2q.jpg","width":1206,"height":865,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/hero-workshop.jpg";
							}

							return target[name];
						}
					});

const dampfdrachenLogo = new Proxy({"src":"/_astro/dampfdrachen-logo.DFx4hnBC.webp","width":2382,"height":2425,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/dampfdrachen-logo.webp";
							}

							return target[name];
						}
					});

export { dampfdrachenLogo as d, heroImage as h };
