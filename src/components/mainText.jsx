import { Card, Spacer, Text } from '@nextui-org/react';

export const MainText = ({ joke }) => {
  return (
    <Card>
      {joke?.type === 'twopart' ? (
        <>
          <Text
            blockquote
            css={{
              color: '$mycolor',
              fontSize: '20px',
              padding: '$2 $4',
            }}>
            {joke?.setup}
          </Text>
          <Spacer y={1} />
          <Text
            blockquote
            css={{
              color: '$mycolor',
              fontSize: '20px',
              padding: '$2 $4',
            }}>
            {joke?.delivery}
          </Text>
        </>
      ) : (
        <Text
          blockquote
          css={{
            color: '$mycolor',
            fontSize: '20px',
            padding: '$2 $4',
          }}>
          {joke?.joke}
        </Text>
      )}
    </Card>
  );
};
