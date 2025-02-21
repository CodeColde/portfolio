import React from "react";
import Case from "../../components/Case";
import {
  Paragraph,
  Problem,
  Process,
  Results,
  Subheading,
  TinyHeading,
  CaseImagesLeft,
  UnorderedList,
  CaseImagesCenter,
} from "../../styles/CaseContent.styles";

const AmongUsTool = () => {
  return (
    <Case
      subtitle="Among Us has gotten many through the tough times of Corona. I created a tool to make them better strategists."
      IntroParagraphs={() => (
        <Paragraph>
          The game is simple: fix the ship with your crewmates, or
          figure out who the traitor among them are. The traitor must kill.
          It's a constant battle against your team. A player can either be
          a crewmate, or an impostor, but regardless they need to play
          smart: keep track of where people are, what they've done, and
          where people killed. This tool helps keep track of everyone, or
          helps figure out what you as a player need to do/be careful of.
        </Paragraph>
      )}
    >
      <Problem>
        <Subheading>Problem</Subheading>
        <Paragraph>
          Because of corona, I, along with many other people in the world, have been
          starved of things to do or ways to interact with people. Many online games
          have felt like the community element felt distant, and the barrier to entry
          regarding meeting people was way too high. Among Us felt like it broke that
          barrier.
        </Paragraph>
        <Paragraph>
          I've become a huge fan of it, playing it almost daily since I discovered it.
          I've met a whole new group of friends, gotten a diverser understanding of the
          casual player base, and gotten immersed in the strategic elements the game
          provides. But there was a clear problem: so much is going on, that it's hard to
          remember everything as the game goes on.
        </Paragraph>
        <Paragraph>
          Though the rounds help break these segments apart, often times the rounds
          start with a player almost coming out more confused of who they need to be careful
          of. This is only as a crewmate, where the chance to win is a lot higher.
        </Paragraph>
        <Paragraph>
          As an impostor, the game was a lot more difficult. You had to blend in, while
          also killing people as you go. In some cases it's better to leave a person alive
          because they are more suspicious than you, and you could use it to your advantage,
          but even this gets hard to memorize, or even plan out. This created an opportunity
          for a tool to help players keep track of these things.
        </Paragraph>
        <Paragraph>
          The ultimate goal of the tool was to help players figure out what they need to
          do, help them make decisions, and act as a partner to them through each phase of the
          game, starting in the lobby.
        </Paragraph>
      </Problem>
      <Process>
        <Subheading>Process</Subheading>
        <Paragraph>
          After quite a few games under my belt, trying out a bunch of different strategies,
          certain strong playstyles started to emerge as prominent winning strategies for
          each game mode. But before we can determine what strategies work best, It's important
          to first understand the core mechanics.
        </Paragraph>
        <TinyHeading>Lobbies</TinyHeading>
        <Paragraph>
          At the start of a game, players get put into a lobby. For a game to run properly, there
          needs to be at least 4 players in a game, and there can be a maximum of 10. Each player
          is asigned a color to identify them, which is unique. I'll return to why this is relevant
          when we discuss the design process.
        </Paragraph>
        <TinyHeading>Game Mechanics</TinyHeading>
        <Paragraph>
          Crewmates need to complete tasks or vote off impostors. Impostors need to slow
          down the speed at which players can complete tasks, as well as kill them. Those
          mechanics seem pretty simple, because the core mechanics of the game happen
          outside of the physical bounds of the game. The real strategies start developing
          through the discussions or the perceived movements of other players. Some terms
          include:
        </Paragraph>
        <UnorderedList>
          <li>Marinating: an impostor grouping up with a crewmate to make the crewmate seem guilty or themselves seem innocent.</li>
          <li>Third Impostoring: a crewmate that is too suspicious of another crewmate, with the impostors egging it on.</li>
          <li>Self reporting: an impostor reporting a body that they killed to look innocent.</li>
          <li>Gaslighting: making an individual think that their suspicion is unwarranted or unrealistic or stupid.</li>
          <li>Hard clearing: a crewmate has 100% certainty that another player is a crewmate.</li>
          <li>Soft clearing: a crewmate is certain that another player could not have committed a particular kill.</li>
          <li>Grouping: players are grouped together in an area for an extended period of time.</li>
          <li>50/50: players are certain that one or the other individual was responsible, and agree to vote out both.</li>
          <li>Vouching: a player can confirm the statement of another player.</li>
        </UnorderedList>
        <Paragraph>
          Each of these elements has influence as to how suspicious someone is.
        </Paragraph>
        <TinyHeading>Crewmate Strategy</TinyHeading>
        <Paragraph>
          A prominent strategy crewmates have developed is to find another crewmate to clear or to
          tag along with a group, so that they can avoid suspicion while also avoiding death. This
          makes it hard for an impostor to kill them discretely.
        </Paragraph>
        <Paragraph>
          Once a crewmate gets cleared, they become 100% void of suspicion, so its safe to group with them,
          as well as also make it easier to narrow down the list of potential suspects.
        </Paragraph>
        <Paragraph>
          Another way to immediately add players to a "sus list" is to figure out if certain players were in
          the area of a particular kill. The best way to see if someone was NOT in the area is to find someone
          who can vouch for another. This way you can at least know who is not suspicious for a kill.
        </Paragraph>
        <Paragraph>
          Already these thoughts will start to command a lot of real estate in the minds of a player. This is where
          a player needs to start keeping track of these things. Because these discussions are pretty dynamic,
          and there are no game mechanics present in the game during a discussion, a webtool could easily help
          organize a crewmate's thoughts.
        </Paragraph>
        <Paragraph>
          Using the aforementioned logic, I found through trial and error that players could fall into 5 groups:
        </Paragraph>
        <UnorderedList>
          <li>Dead or disconnected</li>
          <li>Grouped.</li>
          <li>Hard cleared.</li>
          <li>Suspicious.</li>
          <li>Uncertain, or soft cleared.</li>
        </UnorderedList>
        <TinyHeading>Impostor Strategy</TinyHeading>
        <Paragraph>
          As an impostor, you need to find ways to avoid suspicion while killing off crewmates. It's handy to keep
          track of information to help blend in. For example, as the game develops, a crewmate is particularly
          suspicious in the eyes of other crewmates for a certain kill. Killing this individual forces them
          to have to reevaluate the situation. This puts you at a disadvantage you didnt have to be in.
        </Paragraph>
        <Paragraph>
          Additionally, if a player is hard cleared, you can kill them to leverage an advantage in a group, because
          suddenly the choices becomes filled with more suspicious people than cleared ones, and it makes it easier
          to blend in.
        </Paragraph>
        <Paragraph>
          This causes the impostor to need to organize their kill list in something like the following:
        </Paragraph>
        <UnorderedList>
          <li>Impostors (who are your buddies)</li>
          <li>Need to kill</li>
          <li>Needs to live</li>
          <li>Doesn't matter what happens to them</li>
          <li>Dead</li>
        </UnorderedList>
        <TinyHeading>Design</TinyHeading>
        <Paragraph>
          So now that these categories have been determined for both playstyles, we need to outline the tool's flow.
        </Paragraph>
        <Paragraph>
          Step one: creating the lobby is a matter of matching the colors in a lobby based on which colors exist in the game lobby.
          Step two: select the player type you have been assigned when the game starts. These two things happen right before
          a player gets into the actual physical game, so they should appear in the pre-screen.
        </Paragraph>
        <CaseImagesLeft>
          <img src={require("../../assets/cases/amongustool/set-up-lobby.jpg")} alt="Set up lobby" />
        </CaseImagesLeft>
        <Paragraph>
          After a player has filled the lobby up to at least 4 and at most 10 players, and the player selected
          their player type, the categories appear.
        </Paragraph>
        <CaseImagesCenter>
          <img src={require("../../assets/cases/amongustool/crewmate-playthrough.jpg")} alt="Crewmate Playthrough" />
          <img src={require("../../assets/cases/amongustool/impostor-playthrough.jpg")} alt="Impostor Playthrough" />
        </CaseImagesCenter>
        <Paragraph>
          Now is where the game begins. After the first round of task-doing is over, the tracking can begin. Each container, even
          the start container in the above diagrams, can hold players, so a color can move into each category that you feel a player
          fits in the best. Once the game is over, the player, just like in the game, returns to the lobby with the others.
        </Paragraph>
        <Paragraph>
          The reason why drag and drop is such a core user experience element in this tool is because the game state needs to adapt
          to new information and new developments as it progresses. For example, a kill happened on the left side of the map,
          but a list of 5 players were grouped on the right side. The second round, 2 of those 5 players were grouped in another
          area, while one died, another was cleared through a scan, and another was supposedly near the next kill.
          Now one of those grouped players is clear, another dead, and the other is suspicious, while the other two are still grouped.
        </Paragraph>
      </Process>
      <Results>
        <Subheading>Result</Subheading>
        <Paragraph>
          The project took me a few days to get a "beta" out. The core drag and drop mechanics were pretty easy, and slotting colors
          into each category was done pretty seemlessly. All this was stored in a simple React Context, that any component could use.
        </Paragraph>
        <Paragraph>
          After encouraging some friends to use it, they found that the strategizing really helped, and that it helped them figure
          out what to do, regardless of their player type, which is great news. It implies at least that the targets were hit.
        </Paragraph>
        <Paragraph>
          From the beta, some feedback emerged, most notably for newer users that there was a learning curve to the tool, as user
          feedback wasnt present, making certain interactions confusing. By making totals more transparent, and adding screen shakes,
          as well as an optional first-timer tour, I feel like at least these feedback points were hit.
        </Paragraph>
        <Paragraph>
          The goal of being a partner in the game was also reached by being usable on all devices, though prefered on PC, as well as 
          maintaining a similar design to the actual game, copying button styles and colors directly from the game's interfaces. Some next steps could include:
        </Paragraph>
        <UnorderedList>
          <li>Automating some processes, such as slotting the player into the right category from the start and freezing them there.</li>
          <li>Identifying the game state from the game directly through the use of an API.</li>
        </UnorderedList>
      </Results>
    </Case>
  );
}

export default AmongUsTool;
