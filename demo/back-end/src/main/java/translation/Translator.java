package translation;

import logic.groovy.GroovyRuleGenerator;
import logic.groovy.NodeConverter;
import logic.nodeSetReader.NodeSetReader;
import logic.nodeTypeReader.NodeTypeCollection;
import models.Node;
import models.NodeSet;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

public final class Translator
{
    private static NodeTypeCollection collection = new NodeTypeCollection();

    public static void initialise() throws ClassNotFoundException
    {
        String[] names = new String[]{
                "Comparator",
                "Log",
                "Splitter",
                "Variable",
                "Operator",
                "VariableSaver",
                "Number",
                "Text"
        };
        collection.registerNode(readFile("Then.json"));

        for (String name : names)
        {
            Class<?> type = Class.forName("logic.groovy.converters.Groovy" + name + "Node");
            collection.registerNode(readFile(name + ".json"));
            collection.registerNodeConverter(name, (Class<? extends NodeConverter>) type);
        }

    }

    public static String translate(String input) throws Exception
    {
        NodeSetReader setReader = new NodeSetReader(collection);
        NodeSet nodes = setReader.read(input);

        GroovyRuleGenerator generator = new GroovyRuleGenerator(nodes);

        String result = generator.generate();

        return result;
    }

    private static String readFile(String filePath)
    {
        StringBuilder contentBuilder = new StringBuilder();


        File home = null;
        try
        {
            home = new File(ClassLoader.getSystemResource("nodes").toURI());
        } catch (URISyntaxException e)
        {
            e.printStackTrace();
        }
        Path path = null;
        try
        {
            path = Paths.get(home.getCanonicalPath() + "/" + filePath);
        } catch (IOException e)
        {
            e.printStackTrace();
        }

        try (Stream<String> stream = Files.lines(path, StandardCharsets.UTF_8))
        {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        } catch (IOException e)
        {
            e.printStackTrace();
        }

        String result = contentBuilder.toString();
        ;

        return result;
    }

}
