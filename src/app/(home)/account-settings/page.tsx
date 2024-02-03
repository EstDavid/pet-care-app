import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  const cards = [
    {
      title: 'card1',
      content: 'This is a setting'
    },
    {
      title: 'card2',
      content: 'This is a setting'
    },
    {
      title: 'card3',
      content: 'This is a setting'
    },
    {
      title: 'card4',
      content: 'This is a setting'
    },
    {
      title: 'card5',
      content: 'This is a setting'
    },
    {
      title: 'card6',
      content: 'This is a setting'
    }
  ];
  return (
    <section>
      <h1>This the account settings</h1>
      <div className="flex flex-col gap-10">
        {cards.map((card, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{card.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
