import json

with open('./rules.json', 'w') as f:
    f.write('[\n')
    url_segments_to_block = ['googleads.g.doubleclick.net', 'example.com']
    for i, url in enumerate(url_segments_to_block):
        rule = {}
        rule['id'] = i + 1
        rule['priority'] = 1 # Might want to use a tuple with the priority for each rule
        rule['action'] = {}
        rule['condition'] = {}
        rule['action']['type'] = 'block'
        rule['condition']['urlFilter'] = f'*{url}*'
        f.write(json.dumps(rule))
        if i != len(url_segments_to_block) - 1:
            f.write(',')
        f.write('\n')
    f.write(']')