const heroImage = new Proxy({"src":"/_astro/rg-detailing_Fahrzeugaufbereitung_Tensfeld_Hero.DJ-mbNYL.jpg","width":2752,"height":1536,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/rg-detailing_Fahrzeugaufbereitung_Tensfeld_Hero.jpg";
							}

							return target[name];
						}
					});

export { heroImage as h };
