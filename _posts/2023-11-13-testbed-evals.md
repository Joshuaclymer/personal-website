---
layout: post
title: "Testbed evals: evaluating AI safety even when it can’t be directly measured"
cover-img: /assets/img/turtles.png
thumbnail-img: ""
date: "11 November 2023"
---

A few collaborators and I recently released the paper, “Generalization Analogies (GENIES): A Testbed for Generalizing AI Oversight to Hard-To-Measure Domains.  ([tweet thread](https://twitter.com/joshua_clymer/status/1724851456967417872?s=20)). In this post, I’ll explain how the GENIES benchmark relates to a broader methodology for predicting whether AI systems are safe *even when it is impossible to directly evaluate their behavior.*

Summary: **when AI safety is hard to measure, check whether AI alignment techniques can be used to solve easier-to-grade, analogous problems**. For example, to determine whether developers can control how honesty generalizes to superhuman domains, check whether they can control generalization across other distribution shifts like ‘instructions 5th graders can evaluate’ to ‘instructions that PhDs can evaluate.’ Or to test if developers can catch deception, check whether they can identify deliberately planted ‘trojan’ behaviors. Even when the safety of a particular AI system is hard to measure, the effectiveness of AI safety researchers and their tools is often much easier to measure – just like how it’s easier to measure rocket components in Aerospace testbeds like wind tunnels and pressure chambers than to measure them by launching a rocket. These ‘testbed’  evals will likely be an important pillar of any AI regulatory framework but have so far received little attention.

![img](https://res.cloudinary.com/lesswrong-2-0/image/upload/f_auto,q_auto/v1/mirroredImages/okmB8ymyhgc65WckN/ghuihv6jreaal9mzim2g.png)

## Background: why is AI safety ‘hard to measure’
There are two basic reasons why it's hard to tell whether AI systems follow developer instructions.

**AI behavior could look good but not actually be good**. For example, it's hard to tell if superhuman AI systems obey instructions like “develop successor AIs that you are confident are safe.” Humans can look at AI plans and try their best to determine whether they are reasonable, but it's hard to know if AI systems are gaming human evaluations — or worse – if they have hidden intentions and are trying to pull a fast one on us.


**AI behavior cannot be observed in some environments without incurring risk**. Many safety failures of frontier LLMs have been discovered after deployment, which will become obviously unacceptable after AI systems exceed some threshold of capability. Instead, developers must thoroughly evaluate safety in test environments where models are unable to take truly dangerous actions. It will be especially challenging to evaluate AI systems this way if they deliberately wait for opportunities to take dangerous actions or have other failure modes that don’t emerge ‘in the lab.’


## Safety is hard to measure in other industries too
Safety seems particularly challenging to measure in AI safety, since in most industries, unsafe system aren’t trying to look safe; however, there are still lessons to be gleaned from how safety is measured in other industries. 

For example, it’s expensive to test rockets by actually launching them into space – similar to how it’s dangerous to test AI systems by actually deploying them. Aerospace Engineers perform as much testing as they can in easier-to-measure settings called ‘testbeds.’ For example, they build chambers that simulate the pressure and temperature conditions of empty space, construct rigs that apply strain and vibration to structural components, etc. Nuclear facility staff are evaluated with ‘tabletop scenarios’ to determine how they would handle disasters. 

Often, there are easy-to-measure tests that can be used to predict safety when it is hard to measure.

## ‘Testbeds’ in AI Safety
**Definition.** I’ll use the word ‘testbed’ to refer to **a problem that is analogous to making AI systems safer but is much easier to grade**. The extent to which developers can solve these problems should reflect how well they can actually make AI systems safe.

Examples of AI safety ‘testbeds’ include:

- [Generalization analogies](https://twitter.com/joshua_clymer/status/1724851456967417872?s=20). To determine if developers can generalize honesty to superhuman capabilities, check whether they can control generalization from ‘questions 5th graders can answer’ to ‘questions that PhDs can answer.’ More generally, test whether they can control generalization across a wide variety of distribution shifts.
- [Auditing games](https://www.lesswrong.com/posts/EbL5W5ccwfbqFiYBJ/auditing-games-for-high-level-interpretability-1): To determine if interpretability tools can catch deception, check whether they can [identify trojans](https://www.lesswrong.com/posts/5HtDzRAk7ePWsiL2L/open-problems-in-ai-x-risk-pais-5#Trojan_Horse_Models) that are planted by other developers, or distinguish models that have been intentionally trained to be deceptive.
- [Meta-level adversarial evaluation](https://www.lesswrong.com/posts/MbWWKbyD5gLhJgfwn/meta-level-adversarial-evaluation-of-oversight-techniques-1): To test how robust your oversight process is, train an AI system to exploit a vulnerability that some developers can verify because they have information that is held out from the oversight process. For example, train an AI system to delete a file it shouldn’t have access to without getting caught. Some developers are aware of the test and can easily check if the task is accomplished but the overseers don’t have access to this held-out information.

## Applications of Testbeds
**AI regulation**. A key open problem in AI governance is how to design ‘safety evals.’ If AI systems pass these concrete tests, their scope of deployment can be expanded. Testbeds can be used as safety evals. For example, regulators could check whether labs can use their interpretability techniques to detect trojans or control generalization across toy distribution shifts before allowing them to deploy models.

**Extracting AI safety research from misaligned AIs**. Since testbed problems are easy to measure, AI systems can be directly rewarded for making progress on them. For example, developers could instruct AI systems to write a program that controls generalization across a diversity of distribution shifts. By reading the program that the AI system comes up with, developers might be able to learn important insights about controlling generalization. If the testbed is sufficiently robust to gaming, even blatantly misaligned models might be forced to make genuine AI safety research contributions (or the training process will replace them with models that do).

## Testbed design considerations
**Testbeds should be robust to ‘gaming.’** Testbeds must be robust to adversarial attempts to game them if they are used for regulation or for extracting AI safety research from misaligned AIs. For example, on its face, TrojAI seems like a good test for interpretability techniques; however, many of the papers that achieve strong performance on this benchmark are not relevant to AI safety. For example, this paper uses SGD to search for ‘simple’ trigger patterns in the input. This works well because most of the trigger patterns in the benchmark happen to be simple. Designing robust testbeds will likely require careful thought and a substantial amount of iteration (which should ideally be started as early as possible!)

**Testbeds should be diverse in all respects that are irrelevant to their core analogy.**  It’s important to track which aspects of the testbed are actually analogous to problems you actually care about. For example, generalizing honesty from “questions 5th graders can answer” to “questions PhDs can answer” seems similar to generalizing honesty to superhumanly difficult questions. But why are these problems similar? Is there something special about ‘easy to hard’ distribution shifts? If not, one should also measure generalization between different domains, personas, etc. Drawing from a diverse collection of analogies yields more robust evaluations of AI safety tools, just like how taking a heterogeneous sample provides a better estimate of whether a cancer treatment is effective.

## Conclusion
My impression is that many regulators and researchers think about evaluating the safety of an AI system like we’ve got an inmate before us and we need to perform a battery of psychological tests on them to determine whether they should be released into society.

This is a much too restrictive picture of what safety evals can be. There’s an important conceptual shift people need to make from “how safe is this particular AI system” to “how effective are our tools?” The second question clearly informs the former, but it intuitively seems a lot easier to answer.

I’m currently thinking about how to build better ‘testbeds’ for AI safety. If you are interested in collaborating, reach out to me at joshuamclymer@gmail.com