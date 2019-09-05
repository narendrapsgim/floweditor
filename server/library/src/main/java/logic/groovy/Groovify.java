package logic.groovy;

import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

import java.lang.reflect.InvocationTargetException;

public class Groovify {


    private static Class getComparerClass(Node node) {
        try {
            String packageName = Groovify.class.getPackage().getName() + ".converters." + node.getNodeType().name();
            String fullname = packageName + ".Groovy" + node.getNodeName() +"Node";
            return Class.forName(fullname);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String pre(Node node) throws RuleLibraryException {


            Class comparerClass = getComparerClass(node);
            GroovyConverter converter = constructConverter(comparerClass);
            String s = converter.pre(node);
            if(s == null){
                return "";
            }
            return  s;

    }

        public static String toGroovy(Property property) throws RuleLibraryException {

        Class comparerClass = getComparerClass(property.getNode());
        GroovyConverter converter = constructConverter(comparerClass);
        return converter.toCode(property);
    }

    private static GroovyConverter constructConverter(Class comparerClass) throws RuleLibraryException {
        try {
            return (GroovyConverter) comparerClass.getConstructors()[0].newInstance();
        } catch (Exception e) {
            throw new RuleLibraryException("Can't create instance of " + comparerClass.getSimpleName(),null);
        }
    }
}